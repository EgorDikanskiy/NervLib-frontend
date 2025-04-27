import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import RatingSetter from 'components/RatingSetter';
import BackButton from 'components/ui/BackButton';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getBookOnSlug, getChaptersByBookId } from '../../../actions/detailBookAction';
import styles from './DetailComicsPage.module.scss';

const DetailComicsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    <div className={styles.detailComicsPage}>
      <nav className={styles.nav}>
        <div className={styles.backBlock}>
          <BackButton onClick={() => navigate(routerUrls.catalog.mask)} />
        </div>
        <div className={styles.bookmarkBlock}>
          <p className={styles.bookmark}>Добавить в закладки</p>
        </div>
      </nav>
      <div className={styles.posterBox}>
        <img className={styles.poster} src={book.poster_url} alt={book.title} />
      </div>

      <div className={styles.titleBox}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.rate}>4.7/5</p>
      </div>
      <div className={styles.numbers}>
        <img src="" alt="" />
        <p className={styles.likes}>140</p>
        <p className={styles.favorites}>{book.favourites_count}</p>
        <p className={styles.books}>700</p>
      </div>

      <Link to={routerUrls.viewComics.create(book.slug, chapters.length ? chapters[0].id : 1)}>
        <Button>Читать</Button>
      </Link>

      <div className={styles.descriptionBox}>
        <h2 className={styles.title}>Описание:</h2>
        <p className={styles.description}>{book.description}</p>
      </div>

      <div>
        <div className={styles.info}>
          <h2 className={styles.title}>Дата выхода: </h2>
          <p className={styles.infoItem}> {new Date(book.published_date).toLocaleDateString()}</p>
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>Возрастной рейтинг:</h2>
          <p className={styles.infoItem}>{book.age_rating}</p>
        </div>
        <div className={styles.tags}>
          <h2 className={styles.title}>Теги:</h2>
          <p className={styles.infoItem}>ниндзя</p>
          <p className={styles.infoItem}>герои</p>
          <p className={styles.infoItem}>сёнэн</p>
        </div>
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
    </div>
  );
};

export default DetailComicsPage;
