import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import ImageInput from 'components/ImageInput';
import MultipleImagesInput from 'components/MultipleImagesInput';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './AddChapterPage.module.scss';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formDataSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно для заполнения')
    .max(100, 'Максимальная длина названия - 100 символов'),

  description: z
    .string()
    .min(50, 'Минимальная длина описания - 50 символов')
    .max(2000, 'Максимальная длина описания - 2000 символов'),

  poster: z.array(
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Файл слишком большой')
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Недопустимый формат файла'),
  ),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: Omit<FormData, 'poster'> & { poster: File[] | null } = {
  title: '',
  description: '',
  poster: [],
};

const AddChapterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userFromtData, setUserFormData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<z.ZodFormattedError<FormData> | null>(null);

  const formData = {
    ...initialFormState,
    ...userFromtData,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = formDataSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error.format());
      return;
    }

    try {
      //   await dispatch(postBook(formData));
      navigate(routerUrls.book_detail.create('some-slug'));
    } catch (error) {
      console.error('Ошибка при создании комикса:', error);
    }
  };
  return (
    <>
      <div>
        <h2>Глава</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            id="title"
            label="Название"
            type="text"
            value={formData.title}
            onChange={(e) => setUserFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          {errors?.title && <span className={style.comicForm__error}>{errors.title._errors.join(', ')}</span>}
        </div>
        <div>
          <Textarea
            id="description"
            label="Описание"
            value={formData.description}
            onChange={(e) => setUserFormData((prev) => ({ ...prev, description: e.target.value }))}
          />
          {errors?.description && <p className={style.comicForm__error}>{errors.description._errors.join(', ')}</p>}
        </div>
        <div>
          <MultipleImagesInput
            onChange={(newFiles) => {
              setUserFormData((prev) => ({
                ...prev,
                poster: newFiles ? [...(prev.poster || []), ...newFiles] : [],
              }));
            }}
            value={formData.poster}
          />
          {errors?.poster && <span className={style.comicForm__error}>{errors.poster._errors.join(', ')}</span>}
        </div>
      </form>
    </>
  );
};

export default AddChapterPage;
