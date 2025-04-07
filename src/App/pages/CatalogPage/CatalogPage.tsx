import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Catalog from './components/Catalog';
import Filters from './components/Filters';
import Search from './components/Search';

import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { isFiltersOpen } = useSelector((state: RootState) => state.catalog);
  return (
    <section>
      <Search />
      <Catalog />
      {isFiltersOpen && <Filters></Filters>}
    </section>
  );
};

export default CatalogPage;
