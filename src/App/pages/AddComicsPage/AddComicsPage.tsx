import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import DropDown from 'components/ui/DropDown';
import DropDownForm from 'components/ui/DropDownForm';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './AddComicsPage.module.scss';

// import { createComic } from '../store/comicsSlice';

type FormData = {
  title: string;
  description: string;
  ageRating: string;
  posterUrl: string;
  chapterCount: number;
  slug: string;
};

const initialFormState: FormData = {
  title: '',
  description: '',
  ageRating: '',
  posterUrl: '',
  chapterCount: 0,
  slug: '',
};

const AddComicsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const genreNames = allGenres.map((genre) => genre.name);
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formData = {
    ...initialFormState,
    //server
    ...userFormData,
  };

  // const ageRatings = ['0+', '6+', '12+', '16+', '18+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
  };

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};
  //   if (!formData.title.trim()) newErrors.title = 'Title is required';
  //   if (!formData.description.trim()) newErrors.description = 'Description is required';
  //   if (!formData.poster_url.trim()) newErrors.poster_url = 'Poster is required';
  //   return newErrors;
  // };

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

  return (
    <section className={style.container}>
      <div className={style.menu}>
        <BackButton className={style.menu__back} onClick={() => navigate(routerUrls.profile.mask)} />
        <div className={style.menu__header}>
          <h2>Добавить комикс</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.comicForm}>
        <Input
          id="title"
          label="Название"
          type="text"
          value={formData.title}
          onChange={(e) => setUserFormData((data) => ({ ...data, title: e.target.value }))}
        />
        <Textarea
          id="description"
          label="Описание"
          value={formData.description}
          onChange={(e) => setUserFormData((data) => ({ ...data, description: e.target.value }))}
        />
        <DropDown
          header="Жанр"
          items={genreNames}
          selectedItems={selectedGenre}
          onItemClick={() => setSelectedGenre('')}
        />
        <DropDownForm options={gen} />

        <Button type="submit">Добавить комикс</Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
