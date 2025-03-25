import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import avatar from 'assets/avatar.jpg';
import { RootState } from 'store';
import ProfileInfoItem from '../components/ProfileInfoItem/ProfileInfoItem';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles.profile}>
      <section className={styles.profile__nav}>
        <span className={styles.profile__nav__item}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_148_731)">
              <path
                d="M7.18018 2.0005H2.18018V9.0005C2.18018 9.26572 2.28553 9.52007 2.47307 9.70761C2.66061 9.89515 2.91496 10.0005 3.18018 10.0005H7.18018M7.68018 7.5005L9.18018 6.0005M9.18018 6.0005L7.68018 4.5005M9.18018 6.0005H4.18018"
                stroke="#E18080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_148_731">
                <rect width="12.12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className={styles.profile__nav__item__logout}>Выйти</p>
        </span>
        <span className={styles.profile__nav__item}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_148_734)">
              <path
                d="M6.58001 9.0805L10.278 5.3825C9.65591 5.12261 9.09089 4.7431 8.61501 4.2655C8.13718 3.78952 7.75749 3.22432 7.49751 2.602L3.79951 6.3C3.51101 6.5885 3.36651 6.733 3.24251 6.892C3.09621 7.07974 2.97065 7.28275 2.86801 7.4975C2.78151 7.6795 2.71701 7.8735 2.58801 8.2605L1.90701 10.302C1.87567 10.3955 1.87102 10.4958 1.89359 10.5918C1.91615 10.6878 1.96504 10.7755 2.03475 10.8453C2.10446 10.915 2.19224 10.9639 2.28821 10.9864C2.38418 11.009 2.48454 11.0043 2.57801 10.973L4.61951 10.292C5.00701 10.163 5.20051 10.0985 5.38251 10.012C5.59818 9.90933 5.80001 9.7845 5.98801 9.6375C6.14701 9.5135 6.29151 9.369 6.58001 9.0805ZM11.304 4.3565C11.6727 3.98778 11.8799 3.48769 11.8799 2.96625C11.8799 2.4448 11.6727 1.94471 11.304 1.576C10.9353 1.20728 10.4352 1.00014 9.91376 1.00014C9.39232 1.00014 8.89223 1.20728 8.52351 1.576L8.08001 2.0195L8.09901 2.075C8.31751 2.70039 8.67517 3.26799 9.14501 3.735C9.62598 4.21891 10.2135 4.58362 10.8605 4.8L11.304 4.3565Z"
                fill="#A891FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_148_734">
                <rect width="12.12" height="12" fill="white" transform="translate(0.880005)" />
              </clipPath>
            </defs>
          </svg>
          <p className={styles.profile__nav__item__edit}>Изменить</p>
        </span>
      </section>
      <section className={styles.profile__info__root}>
        <img className={styles.profile__info__root__avatar} src={avatar} alt="аватарка" />
        <p className={styles.profile__info__root__username}>Никнейм</p>
        <p className={styles.profile__info__root__createdAt}>с нами с 13.04.2025</p>
      </section>
      <section className={styles.profile__info__items}>
        <ProfileInfoItem type="subscribers">Подписчиков: 100</ProfileInfoItem>
        <ProfileInfoItem type="followers">Фанатов: 50</ProfileInfoItem>
        <ProfileInfoItem type="birthday">13.04.1999</ProfileInfoItem>
        <ProfileInfoItem type="gender">Мужчина</ProfileInfoItem>
      </section>
      <section className={styles.profile__info__description}>
        <p className={styles.profile__info__description__title}>Обо мне:</p>
        <p className={styles.profile__info__description__subtitle}>
          Привет! Меня зовут Серёжа. Люблю Наруту и считаю, что Мадара должен стать Хокаге!
        </p>
      </section>
      <section className={styles.profile__info__contacts}>
        <p className={styles.profile__info__contacts__title}>Контакты:</p>
        <p className={styles.profile__info__contacts__subtitle}>E-mail: pochta99@mail.ru</p>
      </section>
    </div>
  );
};

export default ProfilePage;
