import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { refresh, getCurrentUser } from 'actions/authActions';
import { addBookmark, deleteBookmark, getBookmarks } from 'actions/bookActions';
import Loader from 'components/Loader';
import TagsOutput from 'components/TagsOutput';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import NoImageProfile from 'components/ui/NoImageProfile';
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    if (book && book.id) {
      dispatch(getBookmarks({ book_id: book.id }))
        .unwrap()
        .then((bookmarks: Array<{ book_id: number; mark: string }>) => {
          // Проверяем наличие закладок и устанавливаем соответствующие состояния
          const hasRecommend = bookmarks.some((bookmark) => bookmark.mark === 'Рекомендую');
          const hasWillRead = bookmarks.some((bookmark) => bookmark.mark === 'Буду читать');

          setIsBookmarked(hasRecommend);
          setIsFavorited(hasWillRead);
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
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

  const handleBookmark = () => {
    if (!user) {
      alert('Авторизируйтесть!');
      return;
    }

    if (book) {
      if (isBookmarked) {
        dispatch(deleteBookmark({ book_id: book.id, mark: 'Рекомендую' }))
          .unwrap()
          .then(() => {
            setIsBookmarked(false);
            // Обновляем данные книги для получения нового количества закладок
            dispatch(getBookOnSlug({ slug: book.slug }));
          })
          .catch((error) => {
            console.error('Error removing bookmark:', error);
          });
      } else {
        dispatch(addBookmark({ book_id: book.id, mark: 'Рекомендую' }))
          .unwrap()
          .then(() => {
            setIsBookmarked(true);
            // Обновляем данные книги для получения нового количества закладок
            dispatch(getBookOnSlug({ slug: book.slug }));
          })
          .catch((error) => {
            console.error('Error adding bookmark:', error);
          });
      }
    }
  };

  const handleFavorite = () => {
    if (!user) {
      alert('Авторизируйтесть!');
      return;
    }

    if (book) {
      if (isFavorited) {
        dispatch(deleteBookmark({ book_id: book.id, mark: 'Буду читать' }))
          .unwrap()
          .then(() => {
            setIsFavorited(false);
            // Обновляем данные книги для получения нового количества закладок
            dispatch(getBookOnSlug({ slug: book.slug }));
          })
          .catch((error) => {
            console.error('Error removing favorite:', error);
          });
      } else {
        dispatch(addBookmark({ book_id: book.id, mark: 'Буду читать' }))
          .unwrap()
          .then(() => {
            setIsFavorited(true);
            // Обновляем данные книги для получения нового количества закладок
            dispatch(getBookOnSlug({ slug: book.slug }));
          })
          .catch((error) => {
            console.error('Error adding favorite:', error);
          });
      }
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.header}>
        <div className={styles.header__back}>
          <BackButton onClick={() => navigate(routerUrls.catalog.mask)} />
        </div>
        <div className={styles.header__bookmark} onClick={handleFavorite}>
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
          <NoImageProfile className={styles.info__authorAvatar} />
          <p>
            <Link to={routerUrls.public_profile.create(book.author.username)}>{book.author.username}</Link>
          </p>
        </section>
      </div>
      <div className={styles.info__stats}>
        <p
          className={`${styles.info__stat} ${styles['info__stat--likes']} ${isBookmarked ? styles.active : ''}`}
          onClick={handleBookmark}
        >
          {book.favourites_count}
        </p>
        <p className={`${styles.info__stat} ${styles['info__stat--favorites']} ${isFavorited ? styles.active : ''}`}>
          {book.favourites_count}
        </p>
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
          <TagsOutput tags={book.tags} />
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
                  className={chapter.id === chapters.length - 1 ? styles.chapters__item : styles.chapters__item}
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
          <>
            <p className={styles.chapters__empty}>Главы не найдены</p>
          </>
        )}
        {book.author.username === user?.username && (
          <Link to={routerUrls.chapter_add.create(book.slug)}>
            <Button>Добавить главу</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DetailComicsPage;
