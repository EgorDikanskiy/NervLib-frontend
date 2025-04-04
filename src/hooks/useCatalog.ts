import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from 'actions/bookActions';

import { AppDispatch, RootState } from 'store';

const useCatalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector((state: RootState) => state.books);
  const { isFiltersOpen } = useSelector((state: RootState) => state.catalog);
  const genreFilter = useSelector((state: RootState) => state.catalog.filters.genres);
  const sortFilter = useSelector((state: RootState) => state.catalog.filters.sort);

  const queryParams = useMemo(() => {
    const params: {
      orderBy?: string;
      order?: 'asc' | 'desc';
      genreId?: number;
    } = {};

    if (sortFilter) {
      const [orderBy, order] = sortFilter.split('-');
      if (orderBy && order) {
        params.orderBy = orderBy;
        params.order = order as 'asc' | 'desc';
      }
    }

    if (genreFilter !== null) {
      params.genreId = genreFilter; //.join(',')
    }

    return params;
  }, [sortFilter, genreFilter]);

  useEffect(() => {
    if (!isFiltersOpen) {
      dispatch(getBooks(queryParams));
    }
  }, [isFiltersOpen, queryParams, dispatch]);

  return {
    books,
    loading,
    error,
    isFiltersOpen,
    genreFilter,
    sortFilter,
  };
};

export default useCatalog;
