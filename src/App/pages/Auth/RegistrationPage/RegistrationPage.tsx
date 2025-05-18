import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { Button } from 'components/ui/Button';
import { GoogleIcon } from 'components/ui/icons/GoogleIcon';
import { LockIcon } from 'components/ui/icons/LockIcon';
import { VkIcon } from 'components/ui/icons/VkIcon';
import { YaIcon } from 'components/ui/icons/YaIcon';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser, registerUser, resetError } from '../../../../actions/authActions';
import styles from './RegistrationPage.module.scss';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const accessToken = localStorage.getItem('access_token');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('unspecified');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate(routerUrls.profile.mask);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (accessToken && !user) {
      navigate('/confirm_mail');
    }
  }, [accessToken, user, navigate]);

  useEffect(() => {
    if (error === 'Токен отсутствует') {
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    setPasswordError(null);
    const result = await dispatch(registerUser({ email, username, birthday, gender, password }));

    if (registerUser.fulfilled.match(result)) {
      navigate('/confirm_mail');
    } else if (registerUser.rejected.match(result)) {
      console.log('Registration failed:', result.payload);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.registration}>
      <h1 className={styles.bold28}>{'Регистрация'}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Никнейм</label>
        <input
          className={styles.form__input}
          type="text"
          id="username"
          placeholder="Ваш никнейм"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <label htmlFor="birthday">Дата рождения</label>
        <input
          className={styles.form__input}
          type="date"
          id="birthday"
          placeholder="Ваша дата рождения"
          min="1900-01-01"
          max="2030-12-31"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />

        <label htmlFor="gender">Пол</label>
        <select
          className={styles.form__select}
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="unspecified">Не хочу говорить</option>
        </select>

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
        {error && (
          <div style={{ color: 'red' }}>
            {typeof error === 'string' ? (
              <p>{error}</p>
            ) : Array.isArray(error) ? (
              (error as string[]).map((msg: string, index: number) => <p key={index}>{msg}</p>)
            ) : null}
          </div>
        )}

        <Button type="submit" disabled={loading}>
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
