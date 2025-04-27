import React, { useState, useRef } from 'react';
import styles from './ImageInput.module.scss';
const ImageInput = () => {
  const [images, setImages] = useState<Partial<HTMLInputElement>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Добавление и удаление
  const selectFiles = () => {
    if (images.name) return;
    fileInputRef.current?.click();
  };
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (files?.length === 0) return;
    if (files[0].type.split('/')[0] !== 'image') return;
    if (images.name !== files[0].name) {
      setImages({
        name: files[0].name,
        src: URL.createObjectURL(files[0]),
      });
    }
  };
  const deleteImage = () => {
    setImages({});
  };
  // ----------------------------------------------------------------------

  // Дарг и дроп
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (!files) return;
    if (files?.length === 0) return;
    if (files[0].type.split('/')[0] !== 'image') return;
    if (images.name !== files[0].name) {
      setImages({
        name: files[0].name,
        src: URL.createObjectURL(files[0]),
      });
    }
  };
  // ----------------------------------------------------------------------

  return (
    <div className={styles.card}>
      <div
        className={styles.drag_area}
        onClick={selectFiles}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={styles.container}>
          {images.name ? (
            <div className={styles.image}>
              <span className={styles.delete} onClick={() => deleteImage()}>
                &times;
              </span>
              <img src={images.src} alt="" />
            </div>
          ) : (
            <div className={styles.text}>
              {isDragging ? (
                <span className={styles.select}>Drop Images Here</span>
              ) : (
                <span>Перетащите изображение или нажмите здесь</span>
              )}
            </div>
          )}
        </div>

        <input name="file" type="file" className={styles.file} ref={fileInputRef} onChange={onFileSelect} />
      </div>
    </div>
  );
};

export default ImageInput;
