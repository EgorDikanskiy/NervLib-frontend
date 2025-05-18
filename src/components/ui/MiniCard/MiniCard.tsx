import React from 'react';
import Rating from './components/Rating';
import style from './MiniCard.module.scss';

interface CardProps {
  title: string;
  rate: string;
  imgSrc?: string;
}

const Card: React.FC<CardProps> = ({ title, rate, imgSrc }) => {
  return (
    <div className={style.card}>
      {imgSrc ? (
        <div
          className={style.card__img}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'black',
          }}
        ></div>
      ) : (
        <div
          className={style.card__img}
          style={{
            backgroundColor: 'black',
          }}
        ></div>
      )}
      <div className={style.card__info}>
        <p className={style.card__title}>{title}</p>
        <Rating rating={rate} />
      </div>
    </div>
  );
};
export default Card;
