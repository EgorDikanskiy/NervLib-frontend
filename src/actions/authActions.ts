import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { email: string; username: string; birthday: string; gender: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const date = new Date(userData.birthday);
      const isoBirthday = date.toISOString();
      userData.birthday = isoBirthday;
      const response = await axios.post(apiRoutes.register, userData, {
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

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.login, userData, {
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

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return rejectWithValue('Токен отсутствует');
    }

    const response = await axios.get(apiRoutes.curentUser, {
      headers: {
        'Content-Type': 'application/json',
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
    return rejectWithValue('An unknown error occurred');
  }
});

export const resetError = createAction('auth/resetError');
