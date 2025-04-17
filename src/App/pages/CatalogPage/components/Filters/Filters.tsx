import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from 'components/ui/BackButton';
import { AppDispatch, RootState } from 'store';

import { toggleFilters, setGenreFilter, setSortFilter, resetFilters } from '../../../../../reducers/catalogReducer';
import DropDown from '../DropDown';
import style from './Filters.module.scss';

interface SortOption {
  label: string;
  value: string;
}

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    filters: { genres: genreFilter, sort: sortFilter },
    allGenres,
  } = useSelector((state: RootState) => state.catalog);

  const genreNames = allGenres.map((genre) => genre.name);
  const selectedGenreName = allGenres.find((g) => g.id === genreFilter)?.name || '';

  const sortOptions: SortOption[] = [
    { label: 'По популярности ', value: 'popularity-asc' },
    { label: 'По популярности', value: 'popularity-desc' },
    { label: 'По дате выхода ', value: 'created_at-asc' },
    { label: 'По дате выхода', value: 'created_at-desc' },
    { label: 'По рейтингу ', value: 'rating-asc' },
    { label: 'По рейтингу', value: 'rating-desc' },
  ];

  const handleGenreSelect = (genreName: string) => {
    const selectedGenre = allGenres.find((g) => g.name === genreName);
    if (!selectedGenre) {
      dispatch(setGenreFilter(null));
      return;
    }

    if (genreFilter === selectedGenre.id) {
      dispatch(setGenreFilter(null));
    } else {
      dispatch(setGenreFilter(selectedGenre.id));
    }
  };

  const handleSortSelect = (sortLabel: string) => {
    const selectedSort = sortOptions.find((opt) => opt.label === sortLabel)?.value || '';
    dispatch(setSortFilter(selectedSort));
  };

  return (
    <div className={style.filters}>
      <div className={style.filters__menu}>
        <BackButton className={style.filters__menu__back} onClick={() => dispatch(toggleFilters(false))} />
        <div className={style.filters__menu__header}>
          <h2>Фильтры</h2>
        </div>
        <div className={style.filters__menu__reset} onClick={() => dispatch(resetFilters())}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.21973 6.63878L3.98398 8.87452C3.90033 8.95817 3.79387 9 3.66459 9C3.53532 9 3.42885 8.95817 3.3452 8.87452C3.26155 8.79087 3.21973 8.68441 3.21973 8.55513C3.21973 8.42586 3.26155 8.31939 3.3452 8.23574L5.58094 6L3.3452 3.76426C3.26155 3.68061 3.21973 3.57414 3.21973 3.44487C3.21973 3.31559 3.26155 3.20913 3.3452 3.12548C3.42885 3.04182 3.53532 3 3.66459 3C3.79387 3 3.90033 3.04182 3.98398 3.12548L6.21973 5.36122L8.45547 3.12548C8.53912 3.04182 8.64558 3 8.77486 3C8.90414 3 9.0106 3.04182 9.09425 3.12548C9.1779 3.20913 9.21973 3.31559 9.21973 3.44487C9.21973 3.57414 9.1779 3.68061 9.09425 3.76426L6.85851 6L9.09425 8.23574C9.1779 8.31939 9.21973 8.42586 9.21973 8.55513C9.21973 8.68441 9.1779 8.79087 9.09425 8.87452C9.0106 8.95817 8.90414 9 8.77486 9C8.64558 9 8.53912 8.95817 8.45547 8.87452L6.21973 6.63878Z"
              fill="#E18080"
            />
          </svg>
          <span>Сбросить</span>
        </div>
      </div>

      <DropDown header="Жанры" items={genreNames} selectedItems={[selectedGenreName]} onItemClick={handleGenreSelect} />

      <DropDown
        header="Сортировка"
        items={sortOptions.map((opt) => opt.label)}
        selectedItems={[sortOptions.find((opt) => opt.value === sortFilter)?.label || '']}
        onItemClick={handleSortSelect}
      />
    </div>
  );
};

export default Filters;
