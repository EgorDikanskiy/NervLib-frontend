import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser, refresh } from '../../actions/authActions';

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) return;

      // Если у нас нет данных пользователя в состоянии, но есть в localStorage,
      // используем их и делаем фоновый запрос для обновления
      const savedUser = localStorage.getItem('user');
      if (!user && accessToken) {
        navigate('/confirm_mail');
      }
      if (!user && savedUser) {
        try {
          const result = await dispatch(getCurrentUser());
          if (result.meta.requestStatus !== 'fulfilled' || !result.payload) {
            const refreshResult = await dispatch(refresh());
            if (refreshResult.meta.requestStatus === 'fulfilled') {
              await dispatch(getCurrentUser());
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken, dispatch, user, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Loader />;
  }

  return <Outlet />;
};

export default PrivateRoute;
