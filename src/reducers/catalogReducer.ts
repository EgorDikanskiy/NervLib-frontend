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

interface Book {
  id: number;
  author_id: number;
  name: string;
  title: string;
  description: string;
  poster_url: string;
  age_rating: string;
  views_count: number;
  chapter_count: number;
  favourites_count: number;
  published_date: string;
}

interface CatalogState {
  // page: number;
  // sort: string;
  // filters: string;
  cardOpen: Book | null;
}

const initialState: CatalogState = {
  // page: 1,
  // sort: '',
  // filters: '',
  cardOpen: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    // setPage: (state, action) => {
    //   state.page = action.payload;
    // },
    // setSort: (state, action) => {
    //   state.sort = action.payload;
    // },
    // setGenreFilter: (state, action) => {
    //   state.filters = action.payload;
    // },
    // setStatusFilter: (state, action) => {
    //   state.filters = action.payload;
    // },
    // resetFilters: (state) => {
    //   state.filters = initialState.filters;
    // },
    openPopup: (state, action) => {
      state.cardOpen = action.payload;
    },
    closePopup: (state) => {
      state.cardOpen = null;
    },
  },
});

// Экспортируем все actions сразу
export const { openPopup, closePopup } = catalogSlice.actions;

export default catalogSlice.reducer;
