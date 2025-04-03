import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getImagesByChapterId = createAsyncThunk(
  'images/chapterId',
  async (data: { chapter_id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.images, {
        params: { chapter_id: data.chapter_id },
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
