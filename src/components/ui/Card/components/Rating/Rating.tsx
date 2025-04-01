import React from 'react';
import style from './Rating.module.scss';
interface RatingProps {
  rating: string;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return <div className={style.rating}>{rating}/5.0</div>;
};

export default Rating;
