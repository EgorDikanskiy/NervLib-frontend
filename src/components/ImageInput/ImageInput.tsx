import React, { useState, useRef } from 'react';
import styles from './ImageInput.module.scss';
const ImageInput = () => {
  const [images, setImages] = useState<Partial<HTMLInputElement>[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Добавление и удаление
  const selectFiles = () => {
    fileInputRef.current?.click();
  };
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (files?.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            src: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };
  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            src: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };
  // ----------------------------------------------------------------------

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p>Drag&Drop image uploading</p>
      </div>
      <div className={styles.drag_area} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (
          <span className={styles.select}>Drop Images Here</span>
        ) : (
          <>
            Drag&Drop image here or{' '}
            <span className={styles.select} role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}

        <input name="file" type="file" className={styles.file} multiple ref={fileInputRef} onChange={onFileSelect} />
      </div>
      <div className={styles.container}>
        {images.map((images, index) => (
          <div key={index} className={styles.image}>
            <span className={styles.delete} onClick={() => deleteImage(index)}>
              &times;
            </span>
            <img src={images.src} alt="" />
          </div>
        ))}
      </div>
      <button type="button">Upload</button>
    </div>
  );
};

export default ImageInput;
