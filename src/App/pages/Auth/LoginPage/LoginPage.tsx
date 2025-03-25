import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { GoogleIcon } from 'components/ui/icons/GoogleIcon';
import { LockIcon } from 'components/ui/icons/LockIcon';
import { VkIcon } from 'components/ui/icons/VkIcon';
import { YaIcon } from 'components/ui/icons/YaIcon';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser, login, resetError } from '../../../../actions/authActions';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (error === 'Токен отсутствует') {
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ login: email, password }));
  };

  if (loading && !user) {
    return <div>Загрузка...</div>;
  }

  if (accessToken || user) {
    navigate(routerUrls.profile.mask);
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.bold28}>{'Вход'}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.regular16}>
          E-mail или никнейм
        </label>
        <input
          className={styles.form__input}
          type="text"
          id="email"
          placeholder="Ваш E-mail или никнейм"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className={styles.regular16}>
          Пароль
        </label>
        <input
          className={styles.form__input}
          type="password"
          id="password"
          placeholder="Минимум 8 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className={styles.form__button} type="submit">
          Войти
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p className={styles.text}>
        Нет аккаунта?{' '}
        <a href="/register" className={styles.registration}>
          Зарегистрируйся
        </a>
      </p>

      <div>
        <p className={styles.text}>Войти с помощью</p>
        <div className={styles.logoWrapper}>
          <VkIcon />
          <YaIcon />
          <GoogleIcon />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
