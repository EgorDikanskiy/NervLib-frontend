import React from 'react';
import HorizontalScroll from 'components/HorizontalScroll';
import Search from 'components/Search';
import MiniCard from 'components/ui/MiniCard';
import styles from './HomePage.module.scss';

const cards = [
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
];

const HomePage = () => {
  return (
    <>
      <section>
        <h2 className={styles.title}>Главная</h2>
        <Search />
      </section>

      <section>
        <div>
          <h3 className={styles.text}>Продолжить читать</h3>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              {cards.map((item, i) => (
                <MiniCard {...item} key={i} />
              ))}
            </div>
          </HorizontalScroll>
        </div>
        <div>
          <h3 className={styles.text}>Новинки</h3>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              {cards.map((item, i) => (
                <MiniCard {...item} key={i} />
              ))}
            </div>
          </HorizontalScroll>
        </div>
        <div>
          <h3 className={styles.text}>Популярное</h3>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              {cards.map((item, i) => (
                <MiniCard {...item} key={i} />
              ))}
            </div>
          </HorizontalScroll>
        </div>
      </section>
    </>
  );
};

export default HomePage;
