import { createSlice } from '@reduxjs/toolkit';
import {
  checkSubscription,
  subscribeToAuthor,
  unsubscribeFromAuthor,
  getProfile,
  updateProfile,
  checkFans,
  fansToAuthor,
  unfansFromAuthor,
} from '../actions/profileActions';

interface Profile {
  username: string;
  avatar: string;
  is_author: boolean;
  is_public_profile: boolean;
  birthday: string;
  gender: string;
  description: string;
  created_at: string;
  subscribers?: number;
  fans?: number;
  is_subscribed?: boolean;
  is_fans?: boolean;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение данных профиля
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Обновление профиля
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Проверка подписки
      .addCase(checkSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSubscription.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          // Предполагается, что API возвращает { status: boolean, timestamp: string }
          state.profile.is_subscribed = action.payload.status;
        }
      })
      .addCase(checkSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Оформление подписки
      .addCase(subscribeToAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToAuthor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.is_subscribed = true;
        }
      })
      .addCase(subscribeToAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Отмена подписки
      .addCase(unsubscribeFromAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromAuthor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.is_subscribed = false;
        }
      })
      .addCase(unsubscribeFromAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Проверка фанатсва
      .addCase(checkFans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkFans.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          // Предполагается, что API возвращает { status: boolean, timestamp: string }
          state.profile.is_fans = action.payload.status;
        }
      })
      .addCase(checkFans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Оформление фанатсва
      .addCase(fansToAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fansToAuthor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.is_fans = true;
        }
      })
      .addCase(fansToAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Отмена фанатсва
      .addCase(unfansFromAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfansFromAuthor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.is_fans = false;
        }
      })
      .addCase(unfansFromAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
