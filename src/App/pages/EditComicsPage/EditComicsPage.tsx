import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag } from 'react-tag-input';
import { z } from 'zod';
import { editBook, getBooks } from 'actions/bookActions';
import { getGenres } from 'actions/catalogActions';
import { getTags } from 'actions/tagActions';
import ImageInput from 'components/ImageInput';
import TagsInput from 'components/TagsInput';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import DropDownForm from 'components/ui/DropDownForm';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './EditComicsPage.module.scss';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

type AgeRating = '0+' | '6+' | '12+' | '16+' | '18+';

const formDataSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно для заполнения')
    .max(100, 'Максимальная длина названия - 100 символов'),

  description: z
    .string()
    .min(20, 'Минимальная длина описания - 50 символов')
    .max(2000, 'Максимальная длина описания - 2000 символов'),

  age_rating: z.enum(['0+', '6+', '12+', '16+', '18+'], {
    errorMap: () => ({ message: 'Выберите возрастной рейтинг' }),
  }),

  tags: z.array(z.number()).min(1, 'Добавьте хотя бы один тег'),

  genre_id: z.number().min(1, 'Выберите жанр'),

  poster: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Файл слишком большой')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Недопустимый формат файла'),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: Omit<FormData, 'poster'> & { poster: File | null } = {
  title: '',
  description: '',
  age_rating: '0+',
  tags: [],
  genre_id: 0,
  poster: null,
};

const EditComicsPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const { tags } = useSelector((state: RootState) => state.tags);
  const { books } = useSelector((state: RootState) => state.books);
  const serverFormState = books.find((book) => book.slug === slug);

  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [isError, setIsError] = useState<boolean>(false);

  useLayoutEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getBooks({ slug }));
        await dispatch(getGenres());
        await dispatch(getTags());
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };

    loadData();
  }, [dispatch, slug]);

  const adaptedServerData = () => {
    return {
      id: serverFormState?.id,
      title: serverFormState?.title,
      description: serverFormState?.description,
      age_rating: serverFormState?.age_rating as AgeRating,
      genre_id: serverFormState?.genre?.id || 0,
      tags: serverFormState?.tags?.map((tag) => tag.id) || [],
      poster: null,
    };
  };

  const formData = {
    ...initialFormState,
    ...adaptedServerData(),
    ...userFormData,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (errors) {
      setIsError(true);
      return;
    }

    if (!formData.title || !formData.description || !formData.id) {
      throw new Error('Поля title, description и id обязательны');
    }

    await dispatch(
      editBook({
        ...formData,
        title: formData.title,
        description: formData.description,
        id: formData.id,
      }),
    );
  };

  const validate = () => {
    const res = formDataSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const errors = isError ? validate() : undefined;

  const ageRatings = [
    {
      id: '0+',
      name: '0+',
    },
    {
      id: '6+',
      name: '6+',
    },
    {
      id: '12+',
      name: '12+',
    },
    {
      id: '16+',
      name: '16+',
    },
    {
      id: '18+',
      name: '18+',
    },
  ];

  return (
    <section className={style.container}>
      <div className={style.menu}>
        <BackButton className={style.menu__back} onClick={() => navigate(routerUrls.profile.mask)} />
        <div className={style.menu__header}>
          <h2>Изменить комикс</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.comicForm}>
        <div>
          <ImageInput onChange={(file) => setUserFormData((prev) => ({ ...prev, poster: file as File }))} />
          {errors?.poster && <span className={style.comicForm__error}>{errors.poster._errors.join(', ')}</span>}
        </div>
        <div>
          <Input
            id="title"
            label="Название"
            type="text"
            value={formData.title}
            onChange={(e) => setUserFormData((data) => ({ ...data, title: e.target.value }))}
          />
          <span className={style.comicForm__error}>{errors?.title?._errors.join(', ')}</span>
        </div>
        <div>
          <Textarea
            id="description"
            label="Описание"
            value={formData.description}
            onChange={(e) => setUserFormData((data) => ({ ...data, description: e.target.value }))}
          />
          <p className={style.comicForm__error}>{errors?.description?._errors.join(', ')}</p>
        </div>

        <div>
          <DropDownForm
            title="Жанр"
            options={allGenres}
            value={formData.genre_id.toString()}
            onChange={(e) =>
              setUserFormData((prev) => ({
                ...prev,
                genre_id: Number(e.target.value),
              }))
            }
          />
          {errors?.genre_id && <span className={style.comicForm__error}>{errors.genre_id._errors.join(', ')}</span>}
        </div>

        <div>
          <DropDownForm
            title="Возрастное ограничение"
            options={ageRatings}
            value={formData.age_rating}
            onChange={(e) =>
              setUserFormData((prev) => ({
                ...prev,
                age_rating: e.target.value as AgeRating,
              }))
            }
          />
          {errors?.age_rating && <span className={style.comicForm__error}>{errors.age_rating._errors.join(', ')}</span>}
        </div>

        <div>
          <TagsInput
            suggestions={
              tags?.map?.((tag) => ({
                id: tag.id.toString(),
                text: tag.title,
                className: '',
              })) || []
            } // Добавляем fallback на случай если tags undefined
            value={(formData.tags || [])?.map?.((tagId) => {
              // Добавляем проверку для formData.tags
              const tag = (tags || []).find((t) => t.id === tagId);
              return {
                id: tagId?.toString() || '',
                text: tag?.title || 'Неизвестный тег',
                className: '',
              };
            })}
            onChange={(newTags: Tag[]) => {
              const parsedTags = newTags.map((tag) => Number(tag.id));
              setUserFormData((prev) => ({ ...prev, tags: parsedTags }));
            }}
          />
          {errors?.tags && <span className={style.comicForm__error}>{errors.tags._errors.join(', ')}</span>}
        </div>

        <Button type="submit" disabled={!!errors}>
          Сохранить
        </Button>
      </form>
    </section>
  );
};

export default EditComicsPage;
