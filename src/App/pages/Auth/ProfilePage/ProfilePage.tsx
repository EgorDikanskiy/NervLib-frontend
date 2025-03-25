import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <div>Профиль: {user?.username}</div>
    </div>
  );
};

export default ProfilePage;
