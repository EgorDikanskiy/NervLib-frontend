import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { postBook } from 'actions/bookActions';
import { getGenres } from 'actions/catalogActions';
import TagsInput from 'components/TagsInput';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import DropDownForm from 'components/ui/DropDownForm';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './AddComicsPage.module.scss';

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
  poster_url:
    'https://yandex-images.clstorage.net/bl95Vd400/a75371s5hd/FI0eXS_5WVBASbFMvF--tUxdCZexd7AJ4x6NpcLx8_ODFI32I1fFMjiizzFuU02cg2FHJTzvjdr6F2sPK7GADFfUUwtrpx5QRV36RvBFsqVZERTUpDWpDeRHgaetmNTX83j3wQ5xtE93oZczPh0H2sMLKWdc7dyC_mQsCDfv2k0DnAtsP90iemdX6GCMZrScUiEhlostiVvjKv3NsabC1_tQ3vcmfIhLZrCBPQIJYc_YOREyRt_RiexPGAkl-dJYJJ0FcyjyBFJVWNpDrWCoolwmCaahALNxzzzR_Zi97cTVUsDZHXCvcmGYjgIDDGz57xc1CkzG-LnLQxQgDej1TRaICX03yy1QaVHMXr9Jg4hxKxGLsiuVUv4X5P-Li8LfwmzS6xZ1mE5KsbMHHCBz8MYyJyxe28uF83YUIA739nIovxhlL-c5bGlz93unS4uyYSodgoMpnlDJM_XziLD74MR34dktZ75VVLmfJgs_Z9vTJgIAefzyr-5KHSkX3-VoF5wBVgrfHkl9StZBl2GwgHY0MLedD7Bw5ArG9Zuv-MT3aerrCny-cne5oT8fMEDf4zIdMG39xKPVaQ8xF9TnWwufJHkI7gRVd0zGTJZ9mZhTHwmDgQ6xeMERweG0ov3m3mvRxgxzpVdGgbQ1OTxs5OQAGSpT38ipwHokJybT0moGoh1PLNw-ekFqxmSyRJG_VwsMh4g3vmzGD_jxgozxwMFtz8ItRb9kaK-IDxkDUfDlGwcVYeDShMpQKCQRz95pA6AFRSnrPFFhaMtaqFWvnU0iCbWvF5hV5S7a8b2u5vHncvLfNkOHbViPgS0pAWPZzDI6BUzlz5j3eggRF9DyaTGeBHAH4hlzfk7XUJdnnLpTKROxjBGtU-0D4NK1gtHT6FPu3Q5Xt0N5l44mLwZKyvsCNABj_sy4_0otHBPLxXIxggR4F-c5T0Fp03GxYLOafzk2tbwys2b8NdLhvKw',
  genre: {
    id: 0,
  },
};

const AddComicsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { allGenres } = useSelector((state: RootState) => state.catalog);
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [isError, setIsError] = useState<boolean>(false);

  useLayoutEffect(() => {
    dispatch(getGenres());
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
            onChange={(e) => setUserFormData((data) => ({ ...data, age_rating: e.target.value }))}
          />
          <span className={style.comicForm__error}>{errors?.age_rating?._errors.join(', ')}</span>
        </div>
        <div>
          <TagsInput />
        </div>

        <Button type="submit" disabled={!!errors}>
          Добавить комикс
        </Button>
      </form>
    </section>
  );
};

export default AddComicsPage;
