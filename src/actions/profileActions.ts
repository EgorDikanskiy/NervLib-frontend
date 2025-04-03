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
      const response = await axios.patch(apiRoutes.profile, payload.data, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);

// Проверка подписки на автора (GET /api/profile/subscribe/{author_username})
export const checkSubscription = createAsyncThunk(
  'profile/checkSubscription',
  async (author_username: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(`${apiRoutes.profile}/subscribe/${encodeURIComponent(author_username)}`, {
        headers: {
          accept: 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);

// Оформление подписки на автора (POST /api/profile/subscribe/{author_username})
export const subscribeToAuthor = createAsyncThunk(
  'profile/subscribeToAuthor',
  async (author_username: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        `${apiRoutes.profile}/subscribe/${encodeURIComponent(author_username)}`,
        null, // POST-запрос без тела
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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

// Отмена подписки на автора (DELETE /api/profile/subscribe/{author_username})
export const unsubscribeFromAuthor = createAsyncThunk(
  'profile/unsubscribeFromAuthor',
  async (author_username: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.delete(`${apiRoutes.profile}/subscribe/${encodeURIComponent(author_username)}`, {
        headers: {
          accept: 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);

// Проверка фанатства на автора (GET /api/profile/fans/{author_username})
export const checkFans = createAsyncThunk('profile/checkFans', async (author_username: string, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${apiRoutes.profile}/fans/${encodeURIComponent(author_username)}`, {
      headers: {
        accept: 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.detail || error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

// Оформление фанатства на автора (POST /api/profile/fans/{author_username})
export const fansToAuthor = createAsyncThunk(
  'profile/funsToAuthor',
  async (author_username: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(
        `${apiRoutes.profile}/fans/${encodeURIComponent(author_username)}`,
        null, // POST-запрос без тела
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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

// Отмена фанатства на автора (DELETE /api/profile/fans/{author_username})
export const unfansFromAuthor = createAsyncThunk(
  'profile/unfunsFromAuthor',
  async (author_username: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.delete(`${apiRoutes.profile}/fans/${encodeURIComponent(author_username)}`, {
        headers: {
          accept: 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  },
);
