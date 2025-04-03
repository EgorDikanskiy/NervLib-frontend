import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getBookOnSlug } from '../../../actions/detailBookAction';
import styles from './DetailComicsPage.module.scss';

const DetailComicsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const { book, loading, error } = useSelector((state: RootState) => state.detailBook);

  useEffect(() => {
    if (slug) {
      dispatch(getBookOnSlug({ slug }));
    }
  }, [dispatch, slug]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!book) {
    return <div>Такой книги нет</div>;
  }

  return (
    <div>
      <section>
        <span className={styles.nav} onClick={() => navigate(-1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_137_888)">
              <path
                d="M1.8 5L1.45 5.35L1.1 5L1.45 4.65L1.8 5ZM10.3 9C10.3 9.13 10.25 9.26 10.15 9.35C10.06 9.45 9.93 9.5 9.8 9.5C9.67 9.5 9.54 9.45 9.45 9.35C9.35 9.26 9.3 9.13 9.3 9H10.3ZM3.95 7.85L1.45 5.35L2.15 4.65L4.65 7.15L3.95 7.85ZM1.45 4.65L3.95 2.15L4.65 2.85L2.15 5.35L1.45 4.65ZM1.8 4.5H6.8V5.5H1.8V4.5ZM10.3 8V9H9.3V8H10.3ZM6.8 4.5C7.73 4.5 8.62 4.87 9.27 5.53C9.93 6.18 10.3 7.07 10.3 8H9.3C9.3 7.34 9.04 6.7 8.57 6.23C8.1 5.76 7.46 5.5 6.8 5.5V4.5Z"
                fill="#303030"
              />
            </g>
            <defs>
              <clipPath id="clip0_137_888">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>Назад</p>
        </span>
      </section>
      <div className={styles.detailComicsPage}>
        <h1 className={styles.title}>{book.title}</h1>
        <img className={styles.poster} src={book.poster_url} alt={book.title} />
        <p className={styles.description}>{book.description}</p>

        <div className={styles.infoBlock}>
          <p className={styles.infoItem}>
            <strong>Возрастное ограничение:</strong> {book.age_rating}
          </p>
          <p className={styles.infoItem}>
            <strong>Автор (ID):</strong> {book.author_id}
          </p>
          <p className={styles.infoItem}>
            <strong>Главы:</strong> {book.chapter_count}
          </p>
          <p className={styles.infoItem}>
            <strong>Просмотры:</strong> {book.views_count}
          </p>
          <p className={styles.infoItem}>
            <strong>В избранном:</strong> {book.favourites_count}
          </p>
          <p className={styles.infoItem}>
            <strong>Дата публикации:</strong> {new Date(book.published_date).toLocaleDateString()}
          </p>
        </div>
        <Button>Начать читать</Button>
      </div>
    </div>
  );
};

export default DetailComicsPage;
