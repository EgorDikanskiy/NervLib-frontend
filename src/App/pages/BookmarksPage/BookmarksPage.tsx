import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBookmarks, getBookById } from 'actions/bookActions';
import Loader from 'components/Loader';
import Card from 'components/ui/Card';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import Navigation, { BookmarkSection } from './components/Navigation';
import styles from './BookmarksPage.module.scss';

interface Book {
  id: number;
  title: string;
  ratings_average: number;
  poster_url: string;
  slug: string;
}

interface Bookmark {
  book_id: number;
  mark: string;
}

const BookMarksPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<BookmarkSection>('all');

  useEffect(() => {
    if (user) {
      dispatch(getAllBookmarks())
        .unwrap()
        .then((data: Bookmark[]) => {
          setBookmarks(data);
          // Получаем книги для каждой закладки
          const bookPromises = data.map((bookmark) => dispatch(getBookById(bookmark.book_id)));
          Promise.all(bookPromises).then((results) => {
            // Удаляем дубликаты книг, оставляя только уникальные по id
            const uniqueBooks = results
              .map((result) => result.payload as Book)
              .filter((book, index, self) => index === self.findIndex((b) => b.id === book.id));
            setBooks(uniqueBooks);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error('Error fetching bookmarks:', error);
          setLoading(false);
        });
    }
  }, [dispatch, user]);

  const getFilteredBooks = () => {
    if (activeSection === 'all') return books;

    const markMap: Record<Exclude<BookmarkSection, 'all'>, string> = {
      reading: 'Рекомендую',
      will_read: 'Буду читать',
      read: 'Прочитано',
    };

    return books.filter((book) =>
      bookmarks.some(
        (b) => b.book_id === book.id && b.mark === markMap[activeSection as Exclude<BookmarkSection, 'all'>],
      ),
    );
  };

  if (loading) return <Loader />;

  return (
    <div>
      <section className={styles.header}>
        <h1>Закладки</h1>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="8" fill="#303030" fillOpacity="0.2" />
          <path
            d="M8.21973 15.1188C8.07806 15.1188 7.9594 15.0708 7.86373 14.9748C7.76806 14.8788 7.72006 14.7601 7.71973 14.6188C7.71939 14.4775 7.7674 14.3588 7.86373 14.2628C7.96006 14.1668 8.07873 14.1188 8.21973 14.1188H10.2197C10.3614 14.1188 10.4802 14.1668 10.5762 14.2628C10.6722 14.3588 10.7201 14.4775 10.7197 14.6188C10.7194 14.7601 10.6714 14.879 10.5757 14.9753C10.4801 15.0716 10.3614 15.1195 10.2197 15.1188H8.21973ZM8.21973 12.6188C8.07806 12.6188 7.9594 12.5708 7.86373 12.4748C7.76806 12.3788 7.72006 12.2601 7.71973 12.1188C7.71939 11.9775 7.7674 11.8588 7.86373 11.7628C7.96006 11.6668 8.07873 11.6188 8.21973 11.6188H13.2197C13.3614 11.6188 13.4802 11.6668 13.5762 11.7628C13.6722 11.8588 13.7201 11.9775 13.7197 12.1188C13.7194 12.2601 13.6714 12.379 13.5757 12.4753C13.4801 12.5716 13.3614 12.6195 13.2197 12.6188H8.21973ZM8.21973 10.1188C8.07806 10.1188 7.9594 10.0708 7.86373 9.97481C7.76806 9.87881 7.72006 9.76015 7.71973 9.61881C7.71939 9.47748 7.7674 9.35881 7.86373 9.26281C7.96006 9.16681 8.07873 9.11881 8.21973 9.11881H16.2197C16.3614 9.11881 16.4802 9.16681 16.5762 9.26281C16.6722 9.35881 16.7201 9.47748 16.7197 9.61881C16.7194 9.76015 16.6714 9.87898 16.5757 9.97531C16.4801 10.0716 16.3614 10.1195 16.2197 10.1188H8.21973Z"
            fill="#303030"
          />
        </svg>
      </section>
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className={styles.catalog}>
        <div className={styles.books}>
          {getFilteredBooks().map((book) => (
            <div key={book.id}>
              <Link to={routerUrls.book_detail.create(book.slug)}>
                <Card title={book.title} rate={Number(book.ratings_average.toFixed(1))} imgSrc={book.poster_url} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookMarksPage;
