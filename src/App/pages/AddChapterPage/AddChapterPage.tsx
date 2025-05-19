import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { getBooks } from 'actions/bookActions';
import { postChapter } from 'actions/chapterActions';
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

  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, 'Файл слишком большой')
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Недопустимый формат файла'),
    )
    .min(1, 'Должна быть хотя бы одна картинка'),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: Omit<FormData, 'images'> & { images: File[] } = {
  title: '',
  description: '',
  images: [],
};

const AddChapterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const { books } = useSelector((state: RootState) => state.books);
  const book = books.find((book) => book.slug === slug);
  const navigate = useNavigate();
  const [userFormtData, setUserFormData] = useState<Partial<FormData>>({});
  const [isErrors, setIsErrors] = useState<z.ZodFormattedError<FormData> | null>(null);

  const formData = {
    ...initialFormState,
    ...userFormtData,
  };

  const validate = () => {
    const res = formDataSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (errors) {
      setIsErrors(errors);
      return;
    }

    try {
      console.log(formData);
      if (!book) {
        console.error('Книга не найдена');
        return;
      }
      // Выполняем запрос
      await dispatch(postChapter({ book_id: book.id, data: formData }));
      // Проверяем, что slug определен
      if (!slug) {
        console.error('Slug не определен');
        return;
      }
      // Переходим на страницу книги
      navigate(routerUrls.book_detail.create(slug));
    } catch (error) {
      console.error('Ошибка при создании главы:', error);
    }
  };

  useEffect(() => {
    dispatch(getBooks({ slug: slug }));
  }, [dispatch, slug]);

  const errors = isErrors ? validate() : undefined;

  return (
    <>
      <div className={style.menu}>
        <BackButton className={style.menu__back} onClick={() => navigate(routerUrls.book_detail.create('some-slug'))} />
        <div className={style.menu__header}>
          <h2>Новая глава</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={style.chapterForm}>
        <div>
          <Input
            id="title"
            label="Название"
            type="text"
            value={formData.title}
            onChange={(e) => setUserFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          {errors?.title && <span className={style.chapterForm__error}>{errors.title._errors.join(', ')}</span>}
        </div>
        <div>
          <Textarea
            id="description"
            label="Описание"
            value={formData.description}
            onChange={(e) => setUserFormData((prev) => ({ ...prev, description: e.target.value }))}
          />
          {errors?.description && <p className={style.chapterForm__error}>{errors.description._errors.join(', ')}</p>}
        </div>
        <div>
          <MultipleImagesInput
            onChange={(newFiles) => {
              setUserFormData((prev) => ({
                ...prev,
                images: newFiles ? [...(prev.images || []), newFiles] : [],
              }));
            }}
          />
          {errors?.images && <span className={style.chapterForm__error}>{errors.images._errors.join(', ')}</span>}
        </div>
        <Button disabled={!!errors} type="submit">
          Добавить главу
        </Button>
      </form>
    </>
  );
};

export default AddChapterPage;
