import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { postBook } from 'actions/bookActions';
import { getGenres } from 'actions/catalogActions';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import DropDownForm from 'components/ui/DropDownForm';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './AddComicsPage.module.scss';

// import { createComic } from '../store/comicsSlice';

const formDataSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  age_rating: z.string().nonempty(),
  poster_url: z.string().nonempty(),
  genre: z.object({
    id: z.number(),
  }),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: FormData = {
  title: '',
  description: '',
  age_rating: '',
  poster_url: 'https://i.pinimg.com/736x/f8/be/52/f8be529c660904a72fa9410600e35c2f.jpg',
  genre: {
    id: 0,
  },
};

const AddComicsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const genreNames = allGenres.map((genre) => genre.name);
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [isError, setIsError] = useState<boolean>(false);

  const formData = {
    ...initialFormState,
    //server
    ...userFormData,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(999);
    const errors = validate();
    if (errors) {
      setIsError(true);
      return;
    }
    console.log(formData);
    await dispatch(postBook(formData));
  };

  const validate = () => {
    const res = formDataSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const errors = isError ? validate() : undefined;

  const gen = [
    {
      id: 1,
      name: 'Экшен',
    },
    {
      id: 2,
      name: 'Фантастика',
    },
    {
      id: 3,
      name: 'Комедия',
    },
    {
      id: 4,
      name: 'Приключения',
    },
    {
      id: 5,
      name: 'Фэнтези',
    },
    {
      id: 6,
      name: 'Хоррор',
    },
  ];

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
            options={gen}
            value={formData.genre.id.toString()}
            onChange={(e) => setUserFormData((data) => ({ ...data, genre: { id: Number(e.target.value) } }))}
          />
          <span className={style.comicForm__error}>{errors?.genre?._errors.join(', ')}</span>
        </div>

        <div>
          <DropDownForm
            title="Возрастное ограничение"
            options={ageRatings}
            value={formData.age_rating}
            onChange={(e) => setUserFormData((data) => ({ ...data, age_rating: e.target.value }))}
          />
          <span className={style.comicForm__error}>{errors?.age_rating?._errors.join(', ')}</span>
        </div>

        <Button type="submit" disabled={!!errors}>
          Добавить комикс
        </Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
