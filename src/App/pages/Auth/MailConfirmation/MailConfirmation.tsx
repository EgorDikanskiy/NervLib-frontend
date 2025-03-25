import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser } from '../../../../actions/authActions';
import styles from './MailConfirmation.module.scss';

const MailConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken) || localStorage.getItem('access_token');

  const handleClick = () => {
    if (accessToken && !user) {
      dispatch(getCurrentUser());
    }
  };

  if (loading) {
    return <div>Проверяем...</div>;
  }

  if (user) {
    navigate(routerUrls.profile.mask);
  }

  return (
    <div className={styles.rootBlock}>
      {!user && <p>Аккаунт не подтверждён</p>}
      <p>Мы отправили вам письмо на почту с ссылкой на подтвеждение аккаунта. Подтвердите аккаунт и нажмите кнопку.</p>
      <Button onClick={handleClick}>Я подтвердил</Button>
    </div>
  );
};

export default MailConfirmation;
