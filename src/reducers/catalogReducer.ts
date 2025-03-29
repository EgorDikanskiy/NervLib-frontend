import { createSlice } from '@reduxjs/toolkit';

// interface Filters {
//   genres?: string[];
//   tags?: string[];
//   status?: 'ongoing' | 'completed';
//   year?: number;
//   chapters?: {
//     min?: number;
//     max?: number;
//   };
// }

interface CatalogState {
  page: number;
  sort: string;
  filters: string;
}

const initialState: CatalogState = {
  page: 1,
  sort: '',
  filters: '',
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.filters = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

// Экспортируем все actions сразу
export const { setPage, setSort, setGenreFilter, setStatusFilter, resetFilters } = catalogSlice.actions;

export default catalogSlice.reducer;
