import React from 'react';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <ul className={styles.navigation}>
      <li className={styles.navigation__item}>
        <p>Все</p>
      </li>
      <li className={styles.navigation__item}>
        <p>Читаю</p>
      </li>
      <li className={styles.navigation__item}>
        <p>Буду читать</p>
      </li>
      <li className={styles.navigation__item}>
        <p>Прочитано</p>
      </li>
    </ul>
  );
};

export default Navigation;
