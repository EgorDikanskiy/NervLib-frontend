import React from 'react';
import style from './CardPopup.module.scss';

interface CardPopupProps {
  onClick: () => void;
  title: string;
  text: string;
}

const CardPopup: React.FC<CardPopupProps> = ({ onClick, title, text }) => {
  return (
    <div className={style.popup} onClick={onClick}>
      <p>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default CardPopup;
