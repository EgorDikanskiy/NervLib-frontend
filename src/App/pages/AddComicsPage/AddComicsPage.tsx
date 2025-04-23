import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
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
  genre: z.string().nonempty(),
  ageRating: z.string().nonempty(),
  // tags: z.array(z.string()).min(1),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: FormData = {
  title: '',
  description: '',
  genre: '',
  ageRating: '',
  // tags: [],
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
    const errors = validate();
    if (errors) {
      setIsError(true);
      return;
    }

    console.log(formData);
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
      id: 1,
      name: 'Все',
    },
    {
      id: 2,
      name: '7+',
    },
    {
      id: 3,
      name: '16+',
    },
    {
      id: 4,
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
            value={formData.genre}
            onChange={(e) => setUserFormData((data) => ({ ...data, genre: e.target.value }))}
          />
          <span className={style.comicForm__error}>{errors?.genre?._errors.join(', ')}</span>
        </div>

        <div>
          <DropDownForm
            title="Возрастное ограничение"
            options={ageRatings}
            value={formData.ageRating}
            onChange={(e) => setUserFormData((data) => ({ ...data, ageRating: e.target.value }))}
          />
          <span className={style.comicForm__error}>{errors?.ageRating?._errors.join(', ')}</span>
        </div>

        <Button type="submit" disabled={!!errors}>
          Добавить комикс
        </Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
