import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getBooks } from '../actions/bookActions';
const useCatalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector((state: RootState) => state.books);
  useEffect(() => {
    dispatch(getBooks({}));
  }, [dispatch]);

  return { books };
};

export default useCatalog;
