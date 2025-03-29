import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'components/ui/Card';
import { useGetBooksQuery } from '../../../../../actions/catalogActions';

import { setSort, setGenreFilter } from '../../../../../reducers/catalogReducer';
import type { RootState, AppDispatch } from '../../../../../store';
import style from './Catalog.module.scss';

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters, sort } = useSelector((state: RootState) => state.catalog);

  const {
    data: books,
    isLoading,
    isFetching,
    refetch,
  } = useGetBooksQuery(
    { filters, sort },
    {
      refetchOnMountOrArgChange: true, // Автоматический рефетч при изменении аргументов
    },
  );

  // Пример обработчиков для изменения параметров
  const handleFilterChange = (newFilter: string) => {
    dispatch(setGenreFilter(newFilter));
  };

  const handleSortChange = (newSort: string) => {
    dispatch(setSort(newSort));
  };

  // Если нужно принудительно обновить при монтировании

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={style.catalog}>
      {books?.map((book) => (
        <Card title={book.title} rate={book.favourites_count} imgSrc={book.poster_url} key={book.id} />
      ))}
    </div>
  );
};

export default Catalog;
