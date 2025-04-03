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
        <Link to={routerUrls.viewComics.create(book.slug, 1)}>
          <Button>Начать читать</Button>
        </Link>
      </div>
    </div>
  );
};

export default DetailComicsPage;
