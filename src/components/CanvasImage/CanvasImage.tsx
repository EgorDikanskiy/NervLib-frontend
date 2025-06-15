import React, { useEffect, useRef } from 'react';

// Тип пропсов: src — Promise<ArrayBuffer>
interface CanvasImageProps {
  src: ArrayBuffer;
}

const CanvasImage: React.FC<CanvasImageProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    let blobUrl: string | null = null;

    const loadImage = async () => {
      try {
        const blob = new Blob([src], { type: 'image/png' });
        blobUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = blobUrl;

        img.onload = () => {
          if (!isMounted) return;

          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };

        img.onerror = () => {
          console.error('Ошибка загрузки изображения из ArrayBuffer');
        };
      } catch (error) {
        console.error('Ошибка обработки ArrayBuffer:', error);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #000',
        width: '100%',
        height: 'auto',
        imageRendering: 'crisp-edges',
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasImage;
