import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { togglePopup } from '../../../reducers/booksReducer'; // Импортируем из slice, а не из actions

interface CardPopupProps {
  id: number;
  title: string;
  text: string;
}

const CardPopup: React.FC<CardPopupProps> = ({ id, title, text }) => {
  const dispatch = useDispatch<AppDispatch>();
  const book = useSelector((state: RootState) => state.books.books.find((book) => book.id === id));

  const handleTogglePopup = () => {
    dispatch(togglePopup(id));
  };

  if (!book) return null; // Если книга не найдена, ничего не рендерим

  return (
    <div onClick={handleTogglePopup}>
      {book.popupShow && (
        <div>
          <p>{title}</p>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default CardPopup;
