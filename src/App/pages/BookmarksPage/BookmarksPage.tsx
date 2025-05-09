import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/ui/Card';
import { routerUrls } from 'config/routerUrls';
import Navigation from './components/Navigation';
import styles from './BookmarksPage.module.scss';

const books = [
  {
    id: 1,
    title: 'Книга 1',
    rate: 4.5,
  },
  {
    id: 2,
    title: 'Книга 2',
    rate: 4.5,
  },
  {
    id: 3,
    title: 'Книга 3',
    rate: 4.5,
  },
  {
    id: 4,
    title: 'Книга 4',
    rate: 4.5,
  },
];

const BookMarksPage = () => {
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
      <Navigation />
      <div className={styles.catalog}>
        <div className={styles.books}>
          {books.map((book) => (
            <div key={book.id}>
              <Link to={routerUrls.book_detail.create(book.id.toString())}>
                <Card
                  title={book.title}
                  rate={book.rate}
                  imgSrc="https://img.freepik.com/free-photo/smooth-gray-background_53876-108462.jpg?t=st=1746548927~exp=1746552527~hmac=07c7bf0e697ccc8d00ee694e4d9c80858a7e29294106d1ff074dcea6c213d50c"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookMarksPage;
