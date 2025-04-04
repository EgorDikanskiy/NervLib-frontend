import React from 'react';
import Rating from 'components/ui/Rating';
import style from './Card.module.scss';

interface CardProps {
  title: string;
  rate: number;
  imgSrc: string;
}

const Card: React.FC<CardProps> = ({ title, rate, imgSrc }) => {
  return (
    <div className={style.card}>
      <div className={style.card__img_container}>
        <img className={style.card__img} src={imgSrc} alt="" />
      </div>
      <div>
        <div>{title}</div>
        <Rating rating={rate} />
      </div>
    </div>
  );
};
export default Card;
