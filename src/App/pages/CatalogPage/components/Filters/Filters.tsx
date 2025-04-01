import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { toggleFilters, setGenreFilter, setSortFilter, resetFilters } from 'reducers/catalogReducer';

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = ['Кодомо', 'Сёнэн', 'Сёндзё', 'Сэйнэн', 'Драма', 'Комедия', 'Детективы', 'Хоррор', 'Фанстастика'];
  const sort = ['По популярности', 'По алфавиту', 'По дате выхода', 'По рейтингу'];
  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div>
      <div>
        <div onClick={() => dispatch(toggleFilters())}>Назад</div>
        <h2>Фильтры</h2>
        <button onClick={handleReset}>Сбросить</button>
      </div>
      <div className="filters-panel">
        {/* Сортировка */}
        <div className="filter-group">
          <label>Сортировать:</label>
          <select value={sort} onChange={(e) => dispatch(setSortFilter(String(e.target.value)))}>
            {sort.map((item) => (
              <option key={item} value={item}>
                {item}
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
    </div>
  );
};

export default Filters;
