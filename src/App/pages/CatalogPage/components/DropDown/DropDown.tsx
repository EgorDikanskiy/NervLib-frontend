import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilters, setGenreFilter, setSortFilter, resetFilters } from 'reducers/catalogReducer';
import { AppDispatch, RootState } from 'store';

const FiltersDropdown = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.catalog);

  const genres = ['Кодомо', 'Сёнэн', 'Сёндзё', 'Сэйнэн', 'Драма', 'Комедия', 'Детективы', 'Хоррор', 'Фанстастика'];

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filters-panel">
      {/* Сортировка */}
      <div className="filter-group">
        <label>Сортировать:</label>
        <select
          value={localFilters.status}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              status: e.target.value as 'all' | 'ongoing' | 'completed',
            })
          }
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'Все' : status === 'ongoing' ? 'Онгоинг' : 'Завершён'}
            </option>
          ))}
        </select>
      </div>
      {/* Жанры (мультиселект) */}
      <div className="filter-group">
        <label>Жанр:</label>
        <select
          multiple
          value={genres}
          onChange={(e) => setGenreFilter(Array.from(e.target.selectedOptions).map((option) => option.value))}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersDropdown;
