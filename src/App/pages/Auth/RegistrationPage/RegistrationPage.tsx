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
import { registerUser } from '../../../../actions/authActions';
import styles from './RegistrationPage.module.scss';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      navigate(routerUrls.profile.mask);
    }
  }, [accessToken, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Проверяем, совпадают ли пароли
    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    setPasswordError(null); // Сбрасываем ошибку, если пароли совпадают
    dispatch(registerUser({ email, password }));
  };

  return (
    <div className={styles.registration}>
      <h1 className={styles.bold28}>{'Регистрация'}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          className={styles.form__input}
          type="text"
          id="email"
          placeholder="Ваш E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          className={styles.form__input}
          type="password"
          id="password"
          placeholder="Минимум 8 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirm-password">Подтвердите пароль</label>
        <input
          className={styles.form__input}
          type="password"
          id="confirm-password"
          placeholder="Введите пароль ещё раз"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button className={styles.form__button} type="submit" disabled={loading}>
          Создать аккаунт
        </Button>
      </form>
      <p className={styles.policy}>
        Регистрируясь, вы соглашаетесь с <span className={styles.policy__colored}>политикой конфиденциальности</span>,
        пользовательским соглашением и даёте согласие на{' '}
        <span className={styles.policy__colored}>обработку персональных данных</span>
      </p>

      <div>
        <p className={styles.text}>Войти с помощью</p>
        <div className={styles.logoWrapper}>
          <a href="/login">
            <LockIcon />
          </a>
          <VkIcon />
          <YaIcon />
          <GoogleIcon />
        </div>
      </div>
    </div>
  );
};

export default Registration;
