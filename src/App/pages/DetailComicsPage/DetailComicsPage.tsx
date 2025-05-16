import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { refresh, getCurrentUser } from 'actions/authActions';
import Loader from 'components/Loader';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getBookOnSlug, getBookRating, getChaptersByBookId, rateBook } from '../../../actions/detailBookAction';
import styles from './DetailComicsPage.module.scss';

const DetailComicsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { book, chapters, loading, error } = useSelector((state: RootState) => state.detailBook);
  const [value, setValue] = useState<number | null>(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken) || localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) return;

      // Получаем данные пользователя и проверяем статус
      const result = await dispatch(getCurrentUser());
      // result.meta.requestStatus будет "fulfilled" если запрос успешен
      if (result.meta.requestStatus !== 'fulfilled' || !result.payload) {
        // Если данные пользователя не получены, выполняем refresh и пробуем снова
        await dispatch(refresh());
        await dispatch(getCurrentUser());
      }
    };

    fetchUserData();
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(getBookOnSlug({ slug }));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (book && book.id) {
      dispatch(getChaptersByBookId({ book_id: book.id }));
    }
  }, [dispatch, book]);

  useEffect(() => {
    if (book && book.id) {
      dispatch(getBookRating(book.id))
        .unwrap()
        .then((data) => {
          if (data && typeof data.score === 'number') {
            setValue(data.score);
          }
        })
        .catch((error) => {
          console.error('Error fetching rating:', error);
          setValue((prevValue) => (prevValue === 0 ? 0 : 0));
        });
    }
  }, [dispatch, book]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!book) {
    return <div>Такой книги нет</div>;
  }

  const ratingChanged = (newRating: number) => {
    console.log(newRating);
    dispatch(rateBook({ book_id: book.id, score: newRating }))
      .unwrap()
      .then(() => {
        setValue(newRating);
        // Обновляем данные книги для получения нового среднего рейтинга
        if (book) {
          dispatch(getBookOnSlug({ slug: book.slug }));
        }
      })
      .catch((error) => {
        console.error('Error rating book:', error);
      });
  };

  console.log(book.author);

  return (
    <div className={styles.page}>
      <nav className={styles.header}>
        <div className={styles.header__back}>
          <BackButton onClick={() => navigate(routerUrls.catalog.mask)} />
        </div>
        <div className={styles.header__bookmark}>
          <p>Добавить в закладки</p>
        </div>
      </nav>
      <div className={styles.poster}>
        <img className={styles.poster__image} src={book.poster_url} alt={book.title} />
      </div>

      <div className={styles.info__container}>
        <section className={styles.info__title}>
          <h1 className={styles.info__titleText}>{book.title}</h1>
          <p className={styles.info__titleRating}>{book.ratings_average.toFixed(1)}/5</p>
        </section>
        <section className={styles.info__author}>
          <img src={book.author.avatar} alt="Фото автора" className={styles.info__authorAvatar} />
          <p>
            <Link to={routerUrls.public_profile.create(book.author.username)}>{book.author.username}</Link>
          </p>
        </section>
      </div>
      <div className={styles.info__stats}>
        <p className={`${styles.info__stat} ${styles['info__stat--likes']}`}>140</p>
        <p className={`${styles.info__stat} ${styles['info__stat--favorites']}`}>{book.favourites_count}</p>
        <p className={`${styles.info__stat} ${styles['info__stat--books']}`}>{book.views_count}</p>
      </div>
      {user && (
        <div className={styles.info__rating}>
          <ReactStars
            key={`rating_${value}`}
            count={5}
            value={value || 0}
            onChange={ratingChanged}
            size={30}
            activeColor="#a890ff"
            edit={true}
          />
        </div>
      )}

      <Link to={routerUrls.viewComics.create(book.slug, chapters.length ? chapters[0].id : 1)}>
        <Button>Читать</Button>
      </Link>

      <div className={styles.info__description}>
        <h2 className={styles.info__descriptionTitle}>Описание:</h2>
        <p className={styles.info__descriptionText}>{book.description}</p>
      </div>

      <div className={styles.info__meta}>
        <div className={styles.info__metaItem}>
          <h2>Дата выхода: </h2>
          <p>{new Date(book.published_date).toLocaleDateString()}</p>
        </div>
        <div className={styles.info__metaItem}>
          <h2>Возрастной рейтинг:</h2>
          <p>{book.age_rating}</p>
        </div>
        <div className={styles.info__tags}>
          <h2>Теги:</h2>
          {book.tags.map((tag) => (
            <p key={tag.id} className={styles.info__tagsItem}>
              {tag.title}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.chapters}>
        <h2 className={styles.chapters__title}>Главы</h2>
        {chapters.length ? (
          <div className={styles.chapters__container}>
            <ul className={styles.chapters__list}>
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={routerUrls.viewComics.create(book.slug, chapter.id)}
                  className={styles.chapters__item}
                >
                  <li>
                    <span className={styles.chapters__name}>{chapter.title}</span>
                    <span className={styles.chapters__date}>
                      {new Date(chapter.published_date).toLocaleDateString()}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.chapters__empty}>Главы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default DetailComicsPage;
