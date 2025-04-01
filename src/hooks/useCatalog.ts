import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getBooks } from '../actions/bookActions';
const useCatalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector((state: RootState) => state.books);
  const { cardOpen } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    dispatch(getBooks({}));
  }, [dispatch]);

  return { books, loading, error, cardOpen };
};

export default useCatalog;
