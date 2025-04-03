import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'components/ui/Card';
import CardPopup from 'components/ui/CardPopup';
import { routerUrls } from 'config/routerUrls';
import useCatalog from 'hooks/useCatalog';
import { AppDispatch } from 'store';
import { openPopup, closePopup } from '../../../../../reducers/catalogReducer';
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
  const { books, loading, cardOpen } = useCatalog();

  const dispatch = useDispatch<AppDispatch>();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (books.length === 0) {
    return (
      <div>
        <p>Sorry, there are no books available at the moment</p>
      </div>
    );
  }

  return (
    <div className={style.catalog}>
      {books.map((book: Book) => (
        <>
          <Link to={routerUrls.book_detail.create(book.slug)}>
            <Card
              title={book.title}
              rate={book.favourites_count}
              imgSrc={book.poster_url}
              key={book.id}
              onClick={() => dispatch(openPopup(book))}
            />
          </Link>
        </>
      ))}
    </div>
  );
};

export default Catalog;
