import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  sort: string;
  genres: string[];
  // tags: string[];
  // status: 'all' | 'ongoing' | 'completed';
  // year: number | null;
  // chapters: {
  //   min: number | null;
  //   max: number | null;
  // };
}

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
  cardOpen: Book | null;
  filters: FiltersState;
  isFiltersOpen: boolean;
}

const initialState: CatalogState = {
  cardOpen: null,
  isFiltersOpen: false,
  filters: {
    genres: [],
    sort: '',
    // tags: [],
    // status: 'all',
    // year: null,
    // chapters: {
    //   min: null,
    //   max: null,
    // },
  },
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    // ФИЛЬТРЫ
    toggleFilters: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    setGenreFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.genres = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<string>) => {
      state.filters.sort = action.payload;
    },
    // setTagFilter: (state, action: PayloadAction<string[]>) => {
    //   state.filters.tags = action.payload;
    // },
    // setStatusFilter: (state, action: PayloadAction<'all' | 'ongoing' | 'completed'>) => {
    //   state.filters.status = action.payload;
    // },
    // setYearFilter: (state, action: PayloadAction<number | null>) => {
    //   state.filters.year = action.payload;
    // },
    // setChaptersFilter: (state, action: PayloadAction<{ min?: number | null; max?: number | null }>) => {
    //   state.filters.chapters = {
    //     ...state.filters.chapters,
    //     ...action.payload,
    //   };
    // },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    // ПОПАП КАРТОЧКИ
    openPopup: (state, action: PayloadAction<Book | null>) => {
      state.cardOpen = action.payload;
    },
    closePopup: (state) => {
      state.cardOpen = null;
    },
  },
});

// Экспортируем все actions сразу
export const { openPopup, closePopup, toggleFilters, setGenreFilter, setSortFilter, resetFilters } =
  catalogSlice.actions;

export default catalogSlice.reducer;
