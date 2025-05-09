import React, { useState, useRef, useCallback } from 'react';
import styles from './ImageInput.module.scss';

interface ImageInputProps {
  onChange: (file: File | null) => void;
  value?: File | null;
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange, value }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onChange(file);
    },
    [onChange],
  );

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.[0]) return;
    handleFile(files[0]);
  };

  const deleteImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (!files?.[0]) return;
    handleFile(files[0]);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.drag_area}
        onClick={selectFiles}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={onDrop}
      >
        <div className={styles.container}>
          {preview ? (
            <div className={styles.image}>
              <span className={styles.delete} onClick={deleteImage}>
                &times;
              </span>
              <img src={preview} alt="Preview" />
            </div>
          ) : (
            <div className={styles.text}>
              {isDragging ? (
                <span className={styles.select}>Отпустите для загрузки</span>
              ) : (
                <span>Перетащите изображение или нажмите здесь</span>
              )}
            </div>
          )}
        </div>

        <input type="file" accept="image/*" className={styles.file} ref={fileInputRef} onChange={onFileSelect} />
      </div>
    </div>
  );
};

export default ImageInput;
