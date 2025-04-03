import { createSlice } from '@reduxjs/toolkit';
import { getBookOnSlug } from '../actions/detailBookAction';

interface Book {
  title: string;
  description: string;
  age_rating: string;
  poster_url: string;
  id: number;
  author_id: number;
  chapter_count: number;
  views_count: number;
  favourites_count: number;
  published_date: string;
  slug: string;
}

interface BookState {
  book: Book | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  book: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearBook(state) {
      state.book = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение книги по слагу
      .addCase(getBookOnSlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookOnSlug.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getBookOnSlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBook } = bookSlice.actions;
export default bookSlice.reducer;
