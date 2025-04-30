import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProfile } from 'actions/profileActions';
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
  const { profile } = useSelector((state: RootState) => state.profile);
  const [value, setValue] = useState<number | null>(2);

  const ratingChanged = (newRating: number) => {
    console.log(newRating);
    setValue(newRating);
  };

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
    if (book) {
      dispatch(getProfile({ username: book.author_name, with_token: false }));
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

      <div className={styles.rootInfoContainer}>
        <section className={styles.titleBox}>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.rate}>4.7/5</p>
        </section>
        <section className={styles.authorBox}>
          <img src={profile?.avatar} alt="Фото автора" className={styles.authorAvatar} />
          <p>{book.author_name}</p>
        </section>
      </div>
      <div className={styles.numbers}>
        <p className={styles.likes}>140</p>
        <p className={styles.favorites}>{book.favourites_count}</p>
        <p className={styles.books}>{book.views_count}</p>
      </div>
      <div className={styles.setRating}>
        <ReactStars
          count={5}
          isHalf={true}
          value={value || 0}
          onChange={ratingChanged}
          size={30}
          activeColor="#a890ff"
          edit={true}
        />
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
          <p className={styles.tagsItem}>ниндзя</p>
          <p className={styles.tagsItem}>герои</p>
          <p className={styles.tagsItem}>сёнэн</p>
        </div>
      </div>

      <div className={styles.chaptersList}>
        <h2 className={styles.chaptersTitle}>Главы</h2>
        {chapters.length ? (
          <div className={styles.scrollContainer}>
            <ul className={styles.chapterItems}>
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={routerUrls.viewComics.create(book.slug, chapter.id)}
                  className={styles.chapterLink}
                >
                  <li className={styles.chapterItem}>
                    <span className={styles.chapterName}>{chapter.title}</span>
                    <span className={styles.chapterDate}>{new Date(chapter.published_date).toLocaleDateString()}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.noChapters}>Главы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default DetailComicsPage;
