import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'components/ui/Card';
import useCatalog from '../../../../../hooks/useCatalog';
import type { RootState, AppDispatch } from '../../../../../store';
import style from './Catalog.module.scss';

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters, sort } = useSelector((state: RootState) => state.catalog);
  const { books } = useCatalog();

  return (
    <div className={style.catalog}>
      {books?.map(
        (book: { title: string; favourites_count: number; poster_url: string; id: React.Key | null | undefined }) => (
          <Card title={book.title} rate={book.favourites_count} imgSrc={book.poster_url} key={book.id} />
        ),
      )}
    </div>
  );
};

export default Catalog;
