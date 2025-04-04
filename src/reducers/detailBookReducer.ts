import { createSlice } from '@reduxjs/toolkit';
import { getBookOnSlug, getChaptersByBookId } from '../actions/detailBookAction';

interface Book {
  title: string;
  description: string;
  age_rating: string;
  poster_url: string;
  id: number;
  author_name: string;
  chapter_count: number;
  views_count: number;
  favourites_count: number;
  published_date: string;
  slug: string;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  published_date: string;
  book_id: number;
}

interface BookState {
  book: Book | null;
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  book: null,
  chapters: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearBook(state) {
      state.book = null;
      state.chapters = [];
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
      })

      // Получение всех глав по Id книги
      .addCase(getChaptersByBookId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChaptersByBookId.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(getChaptersByBookId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBook } = bookSlice.actions;
export default bookSlice.reducer;
