import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';
import Card from 'components/ui/Card';
import { routerUrls } from 'config/routerUrls';
import useCatalog from 'hooks/useCatalog';
import style from './Catalog.module.scss';

interface Book {
  id: number;
  author_id: number;
  name: string;
  title: string;
  description: string;
  poster_url: string;
  age_rating: string;
  views_count: number;
  chapter_count: number;
  favourites_count: number;
  published_date: string;
  slug: string;
}
const Catalog = () => {
  const { books, loading } = useCatalog();

  if (loading) {
    return <Loader />;
  }

  if (books.length === 0) {
    return (
      <div>
        <p>Книг ещё нет :(</p>
      </div>
    );
  }

  return (
    <div className={style.catalog}>
      <div className={style.books}>
        {books.map((book: Book) => (
          <div key={book.id}>
            <Link to={routerUrls.book_detail.create(book.slug)}>
              <Card title={book.title} rate={book.favourites_count} imgSrc={book.poster_url} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
