import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getBooks = createAsyncThunk(
  'books/',
  async (
    params: {
      orderBy?: 'popularity' | 'created_at' | 'rating' | '' | string;
      order?: 'asc' | 'desc';
      genreId?: number;
      title?: string;
      authorId?: string;
      slug?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(apiRoutes.books);
      const searchParams = new URLSearchParams();

      if (params.slug) {
        url.pathname += `/${params.slug}`;
      } else {
        if (params.orderBy) searchParams.append('order_by', params.orderBy);
        if (params.order) searchParams.append('order', params.order);
        if (params.genreId) searchParams.append('genre_id', params.genreId.toString());
        if (params.title) searchParams.append('title', params.title);
        if (params.authorId) searchParams.append('author_id', params.authorId);

        if (Array.from(searchParams).length > 0) {
          url.search = searchParams.toString();
        }
      }

      const response = await axios.get(url.toString(), {
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
      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const postBook = createAsyncThunk(
  'books/',
  async (
    data: {
      title: string;
      description: string;
      age_rating: string;
      poster_url: string;
      genre: {
        id: number;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(apiRoutes.books);
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(url.toString(), data, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
      return rejectWithValue('Произошла ошибка');
    }
  },
);
