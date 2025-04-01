import React from 'react';
import { useDispatch } from 'react-redux';

import Card from 'components/ui/Card';
import CardPopup from 'components/ui/CardPopup';
import useCatalog from 'hooks/useCatalog';

import { AppDispatch } from 'store';
import { openPopup, closePopup } from '../../../../../reducers/catalogReducer';
import Filters from '../Filters';
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
}
const Catalog = () => {
  const { books, loading, cardOpen, isFiltersOpen } = useCatalog();

  const dispatch = useDispatch<AppDispatch>();

  const booksTest = [
    {
      title: 'Война и мир',
      favourites_count: 4.7,
      description: 'Невероятная история',
      poster_url: '',
      id: 1,
    },
    {
      title: 'Война и мир',
      favourites_count: 3.9,
      description: 'Невероятная история',
      poster_url: '',
      id: 2,
    },
    {
      title: 'Война и мир',
      favourites_count: 2.1,
      description: 'Невероятная история',
      poster_url: '',
      id: 3,
    },
  ];

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
          <Card
            title={book.title}
            rate={book.favourites_count}
            imgSrc={book.poster_url}
            key={book.id}
            onClick={() => dispatch(openPopup(book))}
          />
        </>
      ))}
      {cardOpen && (
        <CardPopup onClick={() => dispatch(closePopup())} title={cardOpen.title} text={cardOpen.description} />
      )}
      {isFiltersOpen && <Filters />}
    </div>
  );
};

export default Catalog;
