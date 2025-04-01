import { createSlice } from '@reduxjs/toolkit';
import { getBooks } from '../actions/bookActions';

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
  popupShow: boolean;
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
  reducers: {
    togglePopup: (state, action) => {
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      if (book) {
        book.popupShow = !book.popupShow;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.map((book: Book) => ({
          ...book,
          popupShow: false,
        }));
      })

      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { togglePopup } = booksSlice.actions;
export default booksSlice.reducer;
