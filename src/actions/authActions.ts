import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from 'config/apiRoutes';
import axiosInstance from '../config/axios';

interface AuthError {
  response?: {
    data?: {
      detail?: string | Array<{ msg: string }>;
    };
  };
  message: string;
}

const formatError = (error: AuthError): string => {
  if (error.response?.data?.detail) {
    if (Array.isArray(error.response.data.detail)) {
      return error.response.data.detail.map((err) => err.msg).join(', ');
    }
    return error.response.data.detail;
  }
  return error.message;
};

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
      const response = await axiosInstance.post(apiRoutes.register, userData);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(formatError(error as AuthError));
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { password: string; login: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.login, userData);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(formatError(error as AuthError));
    }
  },
);

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(apiRoutes.curentUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(formatError(error as AuthError));
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(apiRoutes.refresh, null);
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return response.data;
  } catch (error) {
    return rejectWithValue(formatError(error as AuthError));
  }
});

export const logout = createAction('auth/logout', () => {
  localStorage.removeItem('access_token');
  return { payload: null };
});

export const resetError = createAction('auth/resetError');
