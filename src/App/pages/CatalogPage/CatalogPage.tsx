import React from 'react';
import Catalog from './components/Catalog';
import Search from './components/Search';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  return (
    <section>
      <Search />
      <Catalog />
    </section>
  );
};

export default CatalogPage;
