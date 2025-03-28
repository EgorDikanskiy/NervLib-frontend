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
