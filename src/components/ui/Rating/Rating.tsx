import classNames from 'classnames';
import React from 'react';
import style from './Rating.module.scss';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  rating = 5.0;
  const level = rating >= 4.5 ? 'high' : rating >= 3.5 ? 'mid' : 'low';
  const className = classNames(style.rating, style[level]);
  return <div className={className}>{rating.toFixed(1)}/5.0</div>;
};

export default Rating;
