import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'react-tag-input';
import { z } from 'zod';
import { postBook } from 'actions/bookActions';
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
import style from './AddComicsPage.module.scss';

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
    .min(50, 'Минимальная длина описания - 50 символов')
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

const AddComicsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const { tags } = useSelector((state: RootState) => state.tags);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<z.ZodFormattedError<FormData> | null>(null);

  useLayoutEffect(() => {
    dispatch(getGenres());
    dispatch(getTags());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = formDataSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error.format());
      return;
    }

    try {
      await dispatch(postBook(formData));
      navigate(routerUrls.profile.mask);
    } catch (error) {
      console.error('Ошибка при создании комикса:', error);
    }
  };

  const ageRatings = [
    { id: '0+', name: '0+' },
    { id: '6+', name: '6+' },
    { id: '12+', name: '12+' },
    { id: '16+', name: '16+' },
    { id: '18+', name: '18+' },
  ];
  console.log(formData);
  console.log(allGenres);

  return (
    <section className={style.container}>
      <div className={style.menu}>
        <BackButton className={style.menu__back} onClick={() => navigate(routerUrls.profile.mask)} />
        <div className={style.menu__header}>
          <h2>Добавить комикс</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.comicForm}>
        <div>
          <ImageInput onChange={(file) => setFormData((prev) => ({ ...prev, poster: file }))} />
          {errors?.poster && <span className={style.comicForm__error}>{errors.poster._errors.join(', ')}</span>}
        </div>

        <div>
          <Input
            id="title"
            label="Название"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          {errors?.title && <span className={style.comicForm__error}>{errors.title._errors.join(', ')}</span>}
        </div>

        <div>
          <Textarea
            id="description"
            label="Описание"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          />
          {errors?.description && <p className={style.comicForm__error}>{errors.description._errors.join(', ')}</p>}
        </div>

        <div>
          <DropDownForm
            title="Жанр"
            options={allGenres}
            value={allGenres.filter((genre) => genre.id === formData.genre_id)[0]?.name || ''}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                genre_id: Number(e.target.value),
              }));
              console.log(formData);
            }}
          />
          {errors?.genre_id && <span className={style.comicForm__error}>{errors.genre_id._errors.join(', ')}</span>}
        </div>

        <div>
          <DropDownForm
            title="Возрастное ограничение"
            options={ageRatings}
            value={formData.age_rating}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age_rating: e.target.value as AgeRating,
              }))
            }
          />
          {errors?.age_rating && <span className={style.comicForm__error}>{errors.age_rating._errors.join(', ')}</span>}
        </div>

        <div>
          <TagsInput
            suggestions={tags.map((tag) => ({
              id: tag.id.toString(),
              text: tag.title,
              className: '',
            }))}
            value={formData.tags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              return {
                id: tagId.toString(),
                text: tag?.title || 'Неизвестный тег',
                className: '',
              };
            })}
            onChange={(newTags: Tag[]) => {
              const parsedTags = newTags.map((tag) => Number(tag.id));
              setFormData((prev) => ({ ...prev, tags: parsedTags }));
            }}
          />
          {errors?.tags && <span className={style.comicForm__error}>{errors.tags._errors.join(', ')}</span>}
        </div>

        <Button type="submit">Добавить комикс</Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
