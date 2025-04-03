import { createSlice } from '@reduxjs/toolkit';
import { getImagesByChapterId } from '../actions/chapterImagesActions';

interface ImageItem {
  id: number;
  chapter_id: number;
  url: string;
}

interface ImagesState {
  images: ImageItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  loading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    clearImages(state) {
      state.images = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение картинок по id главы
      .addCase(getImagesByChapterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImagesByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(getImagesByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearImages } = imagesSlice.actions;
export default imagesSlice.reducer;
