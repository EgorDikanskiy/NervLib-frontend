import { createSlice } from '@reduxjs/toolkit';
import { getBooks } from '../actions/bookActions';

interface Book {
  id: number;
  title: string;
  description: string;
  age_rating: string;
  chapter_count: number;
  views_count: number;
  favorites_count: number;
  ratings_count: number;
  ratings_average: number;
  published_date: string;
  poster_url: string;
  slug: string;
  author: Author;
  genre: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    title: string;
  }>;
}

interface Author {
  id: number;
  username: string;
  avatar: string;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        // Если запрос был по slug, добавляем книгу в массив
        if (action.meta.arg.slug) {
          state.books = [action.payload];
        } else {
          state.books = action.payload;
        }
      })

      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default booksSlice.reducer;
