import React from 'react';
import useCatalog from 'hooks/useCatalog';
import Catalog from './components/Catalog';
import Filters from './components/Filters';
import Search from './components/Search';

import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { isFiltersOpen } = useCatalog();
  return (
    <section>
      <Search />
      <Catalog />
      {isFiltersOpen && <Filters></Filters>}
    </section>
  );
};

export default CatalogPage;
