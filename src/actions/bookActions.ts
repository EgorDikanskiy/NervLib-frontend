import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getBooks = createAsyncThunk(
  'books/',
  async (params: { authorId?: string; bookName?: string }, { rejectWithValue }) => {
    try {
      let url = apiRoutes.books;

      if (params.bookName) {
        url += `/${params.bookName}`;
      } else if (params.authorId) {
        url += `/?author_id=${params.authorId}`;
      } else {
        url += '/';
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
