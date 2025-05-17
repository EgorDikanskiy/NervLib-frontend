import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks } from 'actions/bookActions';
import HorizontalScroll from 'components/HorizontalScroll';
import Search from 'components/Search';
import MiniCard from 'components/ui/MiniCard';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
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
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(getBooks({ orderBy: 'created_at', order: 'desc' }));
  }, [dispatch]);

  return (
    <>
      <section>
        <h2 className={styles.title}>Главная</h2>
        <Search />
      </section>

      <section>
        <div>
          <h3 className={styles.text}>Новинки</h3>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              {books.map((item, i) => (
                <Link key={i} to={routerUrls.book_detail.create(item.slug)}>
                  <MiniCard title={item.title} rate={item.ratings_average.toFixed(1)} imgSrc={item.poster_url} />
                </Link>
              ))}
            </div>
          </HorizontalScroll>
        </div>
        <div>
          <h3 className={styles.text}>Популярное</h3>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              {books.map((item, i) => (
                <Link key={i} to={routerUrls.book_detail.create(item.slug)}>
                  <MiniCard title={item.title} rate={item.ratings_average.toFixed(1)} imgSrc={item.poster_url} />
                </Link>
              ))}
            </div>
          </HorizontalScroll>
        </div>
      </section>
    </>
  );
};

export default HomePage;
