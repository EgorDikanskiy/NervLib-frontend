import React, { FC, useState, useCallback, useRef, useEffect } from 'react';
import CanvasImage from 'components/CanvasImage';
import { cipher } from 'utils/cipher';
import { getBinaryFromUrl } from 'utils/getBinaryFromUrl';

interface CanvasImageQueueProps {
  images: string[];
  shift: number;
}

const CanvasImageQueue: FC<CanvasImageQueueProps> = ({ images, shift }) => {
  const [processedImages, setProcessedImages] = useState<Array<{ index: number; binary: ArrayBuffer }>>([]);
  const isProcessingRef = useRef(false);

  const processImage = useCallback(
    async (imageUrl: string, index: number) => {
      try {
        const binary = await getBinaryFromUrl(imageUrl);
        const decrypted = await cipher(binary, shift);

        setProcessedImages((prev) => {
          const newEntry = { index, binary: decrypted };
          return [...prev, newEntry];
        });
      } catch (error) {
        console.error(`Ошибка обработки изображения ${index}:`, error);
      }
    },
    [shift],
  );

  useEffect(() => {
    if (!isProcessingRef.current && images.length > 0) {
      isProcessingRef.current = true;

      (async () => {
        for (let i = 0; i < images.length; i++) {
          await processImage(images[i], i);
        }
      })();
    }
  }, [images, processImage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {processedImages.length === 0 ? (
        <p>Изображения загружаются...</p>
      ) : (
        processedImages.map(({ index, binary }) => <CanvasImage key={index} src={binary} />)
      )}
    </div>
  );
};

export default CanvasImageQueue;
