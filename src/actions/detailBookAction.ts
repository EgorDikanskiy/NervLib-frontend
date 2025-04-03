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
