import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'react-tag-input';
import { intersection, object, z } from 'zod';
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

type age = '0+' | '6+' | '12+' | '16+' | '18+';

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

  tags: z.array(z.object({ id: z.number() })).min(1, 'Добавьте хотя бы один тег'),

  genre: z.object({
    id: z.number().min(1, 'Выберите жанр'),
  }),

  poster: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => file !== null, {
      message: 'Загрузите постер',
    })
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      {
        message: 'Файл слишком большой',
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      },
      {
        message: 'Недопустимый формат',
      },
    )
    .nullable(),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: FormData = {
  title: '',
  description: '',
  age_rating: '0+',
  tags: [],
  genre: {
    id: 0,
  },
  poster: null,
};

const AddComicsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const { tags } = useSelector((state: RootState) => state.tags);
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [isError, setIsError] = useState<boolean>(false);

  useLayoutEffect(() => {
    dispatch(getGenres());
    dispatch(getTags());
  }, [dispatch]);

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setIsError(true);
      return;
    }
    console.log(formData);
    // await dispatch(postBook(formData));
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
          <h2>Добавить комикс</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.comicForm}>
        <div>
          <ImageInput
            onChange={(file) => {
              setUserFormData((data) => ({ ...data, poster: file }));
            }}
            value={formData.poster instanceof File ? formData.poster : null}
          />
          <span className={style.comicForm__error}>{errors?.poster?._errors.join(', ')}</span>
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
            value={formData.genre.id === 0 ? '' : formData.genre.id.toString()}
            onChange={(e) => setUserFormData((data) => ({ ...data, genre: { id: Number(e.target.value) } }))}
          />
          <span className={style.comicForm__error}>{errors?.genre?._errors.join(', ')}</span>
        </div>

        <div>
          <DropDownForm
            title="Возрастное ограничение"
            options={ageRatings}
            value={formData.age_rating}
            onChange={(e) => setUserFormData((data) => ({ ...data, age_rating: e.target.value as age }))}
          />
          <span className={style.comicForm__error}>{errors?.age_rating?._errors.join(', ')}</span>
        </div>
        <div>
          <TagsInput
            suggestions={tags.map((el) => ({
              id: el.id.toString(),
              text: el.title,
              className: '',
            }))}
            value={formData.tags?.map((tag) => ({
              id: tag.id.toString(),
              text: tags.find((tagServer) => tagServer.id === Number(tag.id))?.title ?? '',
              className: '',
            }))}
            onChange={(newTags: Tag[]) => {
              const parsedTags = newTags.map((tag) => ({
                id: Number(tag.id),
              }));
              setUserFormData((data) => ({
                ...data,
                tags: parsedTags,
              }));
            }}
          />
          <span className={style.comicForm__error}>{errors?.tags?._errors.join(', ')}</span>
        </div>

        <Button type="submit" disabled={!!errors}>
          Добавить комикс
        </Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
