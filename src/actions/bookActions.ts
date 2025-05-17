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
      age_rating: '0+' | '6+' | '12+' | '16+' | '18+';
      tags: number[];
      genre_id: number;
      poster: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(apiRoutes.books);

      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('age_rating', data.age_rating);
      formData.append('genre_id', data.genre_id.toString());

      data.tags.forEach((tag) => {
        formData.append('tags', tag.toString());
      });

      if (data.poster) {
        formData.append('poster', data.poster);
      }

      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(url.toString(), formData, {
        headers: {
          accept: 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
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

export const editBook = createAsyncThunk(
  'books/:id',
  async (
    data: {
      id: number;
      title: string;
      description: string;
      age_rating: '0+' | '6+' | '12+' | '16+' | '18+';
      tags: number[];
      genre_id: number;
      poster: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const url = new URL(apiRoutes.books + `/${data.id}`);

      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('age_rating', data.age_rating);
      formData.append('genre_id', data.genre_id.toString());
      data.tags.forEach((tag) => {
        formData.append('tags', tag.toString());
      });

      if (data.poster) {
        formData.append('poster', data.poster);
      }

      const accessToken = localStorage.getItem('access_token');
      const response = await axios.patch(url.toString(), formData, {
        headers: {
          accept: 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
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
