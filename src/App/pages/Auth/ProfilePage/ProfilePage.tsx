import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HorizontalScroll from 'components/HorizontalScroll';
import MiniCard from 'components/ui/MiniCard';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { filterUrlImage } from 'utils/filterUrlImage';
import { getProfile } from '../../../../actions/profileActions';
import { logout } from '../../../../reducers/authReducer';
import ProfileInfoItem from '../components/ProfileInfoItem/ProfileInfoItem';
import styles from './ProfilePage.module.scss';

const cards = [
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
  {
    title: 'имя',
    rate: '4.5',
    imgSrc: './test.png',
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);
  let gender = 'Не указан';

  useEffect(() => {
    if (user) {
      dispatch(getProfile({ username: user.username, with_token: true }));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routerUrls.login.mask);
  };

  if (loading) return <div>Загрузка профиля...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!profile) return <div>Профиль не найден</div>;

  switch (profile.gender) {
    case 'male':
      gender = 'Мужской';
      break;
    case 'female':
      gender = 'Мужской';
      break;
    case 'unspecified':
      gender = 'не указан';
      break;
  }

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
          <a onClick={handleLogout} className={styles.profile__nav__item__logout}>
            Выйти
          </a>
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
          <a href={routerUrls.edit_profile.mask} className={styles.profile__nav__item__edit}>
            Изменить
          </a>
        </span>
      </section>
      <section className={styles.profile__info__root}>
        <img className={styles.profile__info__root__avatar} src={filterUrlImage(profile.avatar)} alt="аватарка" />
        <div className={styles.profile__info__root__usernameBlock}>
          <p className={styles.profile__info__root__username}>{profile.username}</p>
          {profile.is_author && (
            <div>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_137_126)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 10.103V6.5C11.5 3.7385 9.2615 1.5 6.5 1.5C3.7385 1.5 1.5 3.7385 1.5 6.5V10.103C1.50003 10.2502 1.53769 10.395 1.60941 10.5235C1.68113 10.6521 1.78452 10.7602 1.90976 10.8375C2.03501 10.9149 2.17795 10.9589 2.32501 10.9655C2.47207 10.972 2.61836 10.9409 2.75 10.875C2.97787 10.761 3.23182 10.7093 3.48611 10.7251C3.74041 10.7409 3.986 10.8237 4.198 10.965C4.43546 11.1234 4.71453 11.208 5 11.208C5.28547 11.208 5.56454 11.1234 5.802 10.965L5.9785 10.848C6.13293 10.745 6.31439 10.6901 6.5 10.6901C6.68561 10.6901 6.86707 10.745 7.0215 10.848L7.198 10.9655C7.43546 11.1239 7.71453 11.2085 8 11.2085C8.28547 11.2085 8.56454 11.1239 8.802 10.9655C9.01405 10.8241 9.25974 10.7413 9.51413 10.7255C9.76852 10.7097 10.0226 10.7614 10.2505 10.8755C10.3822 10.9413 10.5284 10.9723 10.6755 10.9657C10.8225 10.9591 10.9654 10.9149 11.0906 10.8375C11.2158 10.7601 11.3191 10.652 11.3908 10.5235C11.4624 10.3949 11.5 10.2502 11.5 10.103ZM8.5 5.75C8.5 6.164 8.276 6.5 8 6.5C7.724 6.5 7.5 6.164 7.5 5.75C7.5 5.336 7.724 5 8 5C8.276 5 8.5 5.336 8.5 5.75ZM5 6.5C5.276 6.5 5.5 6.164 5.5 5.75C5.5 5.336 5.276 5 5 5C4.724 5 4.5 5.336 4.5 5.75C4.5 6.164 4.724 6.5 5 6.5Z"
                    fill="#A891FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_137_126">
                    <rect width="12" height="12" fill="white" transform="translate(0.5 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        </div>
        <p className={styles.profile__info__root__createdAt}>
          с нами с {new Date(profile.created_at).toLocaleDateString()}
        </p>
      </section>
      <section className={styles.profile__info__items}>
        {profile.is_author && (
          <div>
            <ProfileInfoItem type="subscribers">Подписчиков: {profile.subscribers}</ProfileInfoItem>
            <ProfileInfoItem type="followers">Фанатов: {profile.fans}</ProfileInfoItem>
          </div>
        )}
        <ProfileInfoItem type="birthday">{new Date(profile.birthday).toLocaleDateString()}</ProfileInfoItem>
        <ProfileInfoItem type="gender">{gender}</ProfileInfoItem>
      </section>
      <section className={styles.profile__info__description}>
        <p className={styles.profile__info__description__title}>Обо мне:</p>
        <p className={styles.profile__info__description__subtitle}>{profile.description}</p>
      </section>
      <section className={styles.profile__info__contacts}>
        <p className={styles.profile__info__contacts__title}>Контакты:</p>
        <p className={styles.profile__info__contacts__subtitle}>E-mail: pochta99@mail.ru</p>
      </section>
      {profile.is_author && (
        <section className={styles.comicsBlock}>
          <div className={styles.comicsBlock__header}>
            <p>Мои книги:</p>
            <a className={styles.comicsBlock__header__all}>Смотреть всё</a>
          </div>
          <HorizontalScroll>
            <div className={styles.comicsBlock__content}>
              {cards.map((item, i) => (
                <MiniCard {...item} key={i} />
              ))}
            </div>
          </HorizontalScroll>
        </section>
      )}
      <section className={styles.comicsBlock}>
        <div className={styles.comicsBlock__header}>
          <p>Чиитаю сейчас:</p>
          <a className={styles.comicsBlock__header__all}>Смотреть всё</a>
        </div>
        <HorizontalScroll>
          <div className={styles.comicsBlock__content}>
            {cards.map((item, i) => (
              <MiniCard {...item} key={i} />
            ))}
          </div>
        </HorizontalScroll>
      </section>
      <section className={styles.comicsBlock}>
        <div className={styles.comicsBlock__header}>
          <p>Рекомендую: </p>
          <a className={styles.comicsBlock__header__all}>Смотреть всё</a>
        </div>
        <HorizontalScroll>
          <div className={styles.comicsBlock__content}>
            {cards.map((item, i) => (
              <MiniCard {...item} key={i} />
            ))}
          </div>
        </HorizontalScroll>
      </section>
      <section className={styles.comicsBlock}>
        <div className={styles.comicsBlock__header}>
          <p>Закладки: </p>
          <a className={styles.comicsBlock__header__all}>Смотреть всё</a>
        </div>
        <HorizontalScroll>
          <div className={styles.comicsBlock__content}>
            {cards.map((item, i) => (
              <MiniCard {...item} key={i} />
            ))}
          </div>
        </HorizontalScroll>
      </section>
      <section className={styles.comicsBlock}>
        <div className={styles.comicsBlock__header}>
          <p>Прочитал: </p>
          <a className={styles.comicsBlock__header__all}>Смотреть всё</a>
        </div>
        <HorizontalScroll>
          <div className={styles.comicsBlock__content}>
            {cards.map((item, i) => (
              <MiniCard {...item} key={i} />
            ))}
          </div>
        </HorizontalScroll>
      </section>
    </div>
  );
};

export default ProfilePage;
