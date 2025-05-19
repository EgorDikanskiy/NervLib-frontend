import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './MultipleImagesInput.module.scss';

interface MultipleImagesInputProps {
  onChange: (files: File) => void;
}
const MultipleImagesInput: React.FC<MultipleImagesInputProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => setPreview((prev) => [...prev, e.target?.result as string]);
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
    if (!files) return;
    handleFile(Array.from(files).slice(-1)[0]);
  };

  const deleteImage = (index: number) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (!files?.[0]) return;
    handleFile(files[0]);
  };

  return (
    <>
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
          onDrop={(e) => {
            onDrop(e);
            setIsDragging(false);
          }}
        >
          <div className={styles.container}>
            <div className={styles.text}>
              {isDragging ? (
                <span className={styles.select}>Отпустите для загрузки</span>
              ) : (
                <span>Перетащите изображение или нажмите здесь</span>
              )}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className={styles.file}
            ref={fileInputRef}
            onChange={onFileSelect}
            multiple
          />
        </div>
      </div>
      {preview?.length != 0 && (
        <div className={styles.preview_container}>
          {preview?.map((image, index) => (
            <div className={styles.image} key={index}>
              <span className={styles.delete} onClick={() => deleteImage(index)}>
                &times;
              </span>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultipleImagesInput;
