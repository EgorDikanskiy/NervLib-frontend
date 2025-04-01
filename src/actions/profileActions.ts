import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (profileData: { username: string; with_token: boolean }, { rejectWithValue }) => {
    try {
      let response;
      if (profileData.with_token) {
        const accessToken = localStorage.getItem('access_token');
        response = await axios.get(`${apiRoutes.profile}/${encodeURIComponent(profileData.username)}`, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        response = await axios.get(`${apiRoutes.profile}/${encodeURIComponent(profileData.username)}`, {
          headers: {
            accept: 'application/json',
          },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (
    payload: {
      originalUsername: string;
      data: {
        avatar?: string;
        description?: string;
        is_author?: boolean;
        is_public_profile?: boolean;
        birthday?: string;
        gender?: string;
        username?: string; // отправляем только если изменился
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.patch(
        `${apiRoutes.profile}/${encodeURIComponent(payload.originalUsername)}`,
        payload.data,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);
