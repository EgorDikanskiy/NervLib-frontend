import React from 'react';

interface CardPopupProps {
  onClick: () => void;
  title: string;
  text: string;
}

const CardPopup: React.FC<CardPopupProps> = ({ onClick, title, text }) => {
  return (
    <div onClick={onClick}>
      <p>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default CardPopup;
