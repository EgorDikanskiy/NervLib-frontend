import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGenres } from 'actions/catalogActions';
interface FiltersState {
  sort: 'popularity' | 'created_at' | 'rating' | '' | string;
  genres: number | null;
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
  slug: string;
}

interface CatalogState {
  filters: FiltersState;
  isFiltersOpen: boolean;
  loading: boolean;
  error: string | null;
  allGenres: {
    id: number;
    name: string;
  }[];
}

const initialState: CatalogState = {
  isFiltersOpen: false,
  filters: {
    genres: null,
    sort: '',
    // tags: [],
    // status: 'all',
    // year: null,
    // chapters: {
    //   min: null,
    //   max: null,
    // },
  },
  loading: false,
  allGenres: [],
  error: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {
    // ФИЛЬТРЫ
    toggleFilters: (state, action: PayloadAction<boolean>) => {
      state.isFiltersOpen = action.payload;
    },
    setGenreFilter: (state, action: PayloadAction<number | null>) => {
      state.filters.genres = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<'popularity' | 'created_at' | 'rating' | '' | string>) => {
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
  },
  extraReducers: (builder) => {
    builder
      // Регистрация пользователя
      .addCase(getGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.allGenres = action.payload;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFilters, setGenreFilter, setSortFilter, resetFilters } = catalogSlice.actions;

export default catalogSlice.reducer;
