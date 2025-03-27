import React from 'react';
import Card from 'components/ui/Card';
import style from './Catalog.module.scss';

const cards = [
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
  {
    title: '999',
    rate: 999,
    imgSrc: '999',
  },
];

const Catalog = () => {
  return (
    <div className={style.catalog}>
      {cards.map((item, i) => (
        <Card {...item} key={i} />
      ))}
    </div>
  );
};

export default Catalog;
