import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser } from '../../actions/authActions';

const PrivateRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(getCurrentUser());
    }
  }, [accessToken, user, dispatch]);

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
