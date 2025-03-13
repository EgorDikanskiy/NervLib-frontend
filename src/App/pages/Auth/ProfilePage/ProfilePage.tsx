import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      Профиль email: {user?.email}
      is_admin: {user?.is_admin && 'Да'} {!user?.is_admin && 'Нет'}
    </div>
  );
};

export default ProfilePage;
