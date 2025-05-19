import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

// Тип для данных запроса
interface ChapterData {
  title: string;
  description: string;
  images: File[];
}

// Тип для аргумента thunk
interface PostChapterArgs {
  book_id: number;
  data: ChapterData;
}

export const postChapter = createAsyncThunk(
  'chapters/',
  async (
    { book_id, data }: PostChapterArgs,

    { rejectWithValue },
  ) => {
    try {
      const url = new URL(apiRoutes.chapters);
      url.searchParams.set('book_id', book_id.toString());

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      data.images.forEach((file) => {
        formData.append('images', file);
      });

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
