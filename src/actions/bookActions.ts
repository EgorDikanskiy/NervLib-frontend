import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';
import axiosInstance from '../config/axios';

export const getBooks = createAsyncThunk(
  'books/',
  async (
    params: {
      orderBy?: 'popularity' | 'created_at' | 'rating' | '' | string;
      order?: 'asc' | 'desc';
      genreId?: number;
      title?: string;
      authorId?: number;
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
        if (params.authorId) searchParams.append('author_id', params.authorId.toString());

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

export const addBookmark = createAsyncThunk(
  'books/addBookmark',
  async (data: { book_id: number; mark: string }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axiosInstance.post(apiRoutes.bookmarks, data, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
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

export const deleteBookmark = createAsyncThunk(
  'books/deleteBookmark',
  async (data: { book_id: number; mark: string }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.delete(apiRoutes.bookmarks, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data,
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

export const getBookmarks = createAsyncThunk(
  'books/getBookmarks',
  async ({ book_id }: { book_id: number }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axiosInstance.get(`/bookmarks/${book_id}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
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

export const getAllBookmarks = createAsyncThunk('books/getAllBookmarks', async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axiosInstance.get('/bookmarks', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
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
});

export const getBookById = createAsyncThunk('books/getBookById', async (book_id: number, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/books/id/${book_id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
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
});
