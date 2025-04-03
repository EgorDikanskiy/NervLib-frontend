import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getBookOnSlug, getChaptersByBookId } from '../../../actions/detailBookAction';
import styles from './DetailComicsPage.module.scss';

const DetailComicsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const { book, chapters, loading, error } = useSelector((state: RootState) => state.detailBook);

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

  if (loading) {
    return <Loader />;
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
            <strong>Автор :</strong>{' '}
            <Link to={routerUrls.public_profile.create(book.author_name)}>{book.author_name}</Link>
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
        <div className={styles.chaptersList}>
          <h2 className={styles.chaptersTitle}>Главы</h2>
          {chapters.length ? (
            <ul className={styles.chapterItems}>
              {chapters.map((chapter) => (
                <li key={chapter.id} className={styles.chapterItem}>
                  <span className={styles.chapterName}>{chapter.title}</span>
                  <span className={styles.chapterDate}>{new Date(chapter.published_date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noChapters}>Главы не найдены</p>
          )}
        </div>
        <Link to={routerUrls.viewComics.create(book.slug, chapters.length ? chapters[0].id : 1)}>
          <Button>Начать читать</Button>
        </Link>
      </div>
    </div>
  );
};

export default DetailComicsPage;
