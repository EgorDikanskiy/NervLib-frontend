import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './MultipleImagesInput.module.scss';

interface MultipleImagesInputProps {
  onChange: (files: File[] | null) => void;
  value?: File[] | null;
}
const MultipleImagesInput: React.FC<MultipleImagesInputProps> = ({ onChange, value }) => {
  // const [files, setFiles] = useState<File[]>(value || []);
  const [previews, setPreviews] = useState<string[]>(() => {
    if (value) {
      return value.map((file) => URL.createObjectURL(file));
    }
    return [];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const filesArray = Array.from(newFiles);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
      onChange(filesArray);
    },
    [onChange],
  );
  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const deleteImage = (index: number) => {
    if (!value) return;

    const updatedFiles = value.filter((_, i) => i !== index);
    const result = updatedFiles.length > 0 ? updatedFiles : null;
    onChange(result); // Передаём обновлённый массив в родитель
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) handleFiles(files);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files?.length) handleFiles(files);
  };

  useEffect(() => {
    if (value) {
      setPreviews(value.map((file) => URL.createObjectURL(file)));
    } else {
      setPreviews([]);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);
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
          onDrop={onDrop}
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
      <div className={styles.preview_container}>
        {previews.map((previewUrl, index) => (
          <div className={styles.image} key={index}>
            <span className={styles.delete} onClick={() => deleteImage(index)}>
              &times;
            </span>
            <img src={previewUrl} alt="Preview" />
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleImagesInput;
