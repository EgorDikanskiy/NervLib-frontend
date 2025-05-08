import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getBookOnSlug = createAsyncThunk('books/slug', async (bookData: { slug: string }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiRoutes.bookOnSlug(bookData.slug)}`, {
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const messages = error.response.data.detail?.map((err: string) => err.msg) || [error.response.data.detail];
      return rejectWithValue(messages);
    }
    return rejectWithValue(error.message);
  }
});

export const getChaptersByBookId = createAsyncThunk(
  'chapters/getAll',
  async (data: { book_id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.chapters, {
        params: { book_id: data.book_id },
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const messages = error.response.data.detail?.map((err) => err.msg) || [error.response.data.detail];
        return rejectWithValue(messages);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const rateBook = createAsyncThunk(
  'books/rate',
  async (data: { book_id: number; score: number }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        return rejectWithValue('Токен отсутствует');
      }
      const response = await axios.post(apiRoutes.ratings, data, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const messages = error.response.data.detail?.map((err: { msg: string }) => err.msg) || [
          error.response.data.detail,
        ];
        return rejectWithValue(messages);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const getBookRating = createAsyncThunk('books/getRating', async (bookId: number, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return rejectWithValue('Токен отсутствует');
    }

    const response = await axios.get(`${apiRoutes.ratings}/${bookId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const messages = error.response.data.detail?.map((err: { msg: string }) => err.msg) || [
        error.response.data.detail,
      ];
      return rejectWithValue(messages);
    }
    return rejectWithValue(error.message);
  }
});
