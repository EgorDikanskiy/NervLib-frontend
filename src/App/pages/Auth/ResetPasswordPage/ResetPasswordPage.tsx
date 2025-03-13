import React, { FormEvent, useState } from 'react';
import { Button } from 'components/ui/Button';
import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Дописать взаимодействие с беком
  };

  return (
    <div className={styles.registration}>
      <h1 className={styles.bold28}>{'Сбросить пароль'}</h1>
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

        <Button className={styles.form__button} type="submit" disabled={false}>
          Отправить код
        </Button>
      </form>
      <p className={styles.secondary}>На почту придёт код подтверждения</p>
      <p className={styles.secondary}>для сброса старого пароля</p>
    </div>
  );
};

export default ResetPasswordPage;
