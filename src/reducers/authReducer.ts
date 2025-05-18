import { createSlice } from '@reduxjs/toolkit';
import { registerUser, login, getCurrentUser, resetError, refresh } from '../actions/authActions';

interface User {
  username: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Получаем начальное состояние из localStorage
const getInitialState = (): AuthState => {
  const accessToken = localStorage.getItem('access_token');
  const savedUser = localStorage.getItem('user');
  return {
    accessToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Логин пользователя
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Получение пользователя
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Не очищаем пользователя при ошибке получения данных
      })

      .addCase(resetError, (state) => {
        state.error = null;
      })

      // refresh
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.accessToken = null;
        state.user = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      });
  },
});

export const { logout, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
