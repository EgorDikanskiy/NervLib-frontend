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
      <a href="#">
        <div className={style.card__img} style={{ backgroundImage: `url(${imgSrc})` }}></div>
        <div>
          <div>{title}</div>
          <Rating rating={rate} />
        </div>
      </a>
    </div>
  );
};
export default Card;
