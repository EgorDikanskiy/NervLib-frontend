import React from 'react';
import Card from 'components/ui/Card';
import useCatalog from 'hooks/useCatalog';
import style from './Catalog.module.scss';

const Catalog = () => {
  const { books, loading } = useCatalog();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (books.length === 0) {
    return (
      <div>
        <p>Sorry, there are no books available at the moment</p>
      </div>
    );
  }

  return (
    <div className={style.catalog}>
      {books?.map(
        (book: { title: string; favourites_count: number; poster_url: string; id: React.Key | null | undefined }) => (
          <Card title={book.title} rate={book.favourites_count} imgSrc={book.poster_url} key={book.id} />
        ),
      )}
    </div>
  );
};

export default Catalog;
