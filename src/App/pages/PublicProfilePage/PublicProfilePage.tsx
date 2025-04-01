import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import HorizontalScroll from 'components/HorizontalScroll';
import MiniCard from 'components/ui/MiniCard';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { filterUrlImage } from 'utils/filterUrlImage';
import { getProfile } from '../../../actions/profileActions';
import ProfileInfoItem from '../Auth/components/ProfileInfoItem/ProfileInfoItem';
import styles from './PublicProfilePage.module.scss';

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

const PublicProfilePage = () => {
  const { username } = useParams();
  console.log(username);
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);
  let gender = 'Не указан';

  useEffect(() => {
    if (username) {
      dispatch(getProfile({ username: username, with_token: false }));
    }
  }, [dispatch, username]);

  if (loading) return <div>Загрузка профиля...</div>;
  if (!profile) return <div>Профиль не найден</div>;
  if (!profile.is_public_profile) return <div>Профиль не публичный, соре</div>;
  if (error) return <div>Ошибка: {error}</div>;

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
        <span className={styles.profile__nav__item__back}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_137_888)">
              <path
                d="M1.80002 5L1.44652 5.3535L1.09302 5L1.44652 4.6465L1.80002 5ZM10.3 9C10.3 9.13261 10.2473 9.25979 10.1536 9.35355C10.0598 9.44732 9.93263 9.5 9.80002 9.5C9.66741 9.5 9.54023 9.44732 9.44646 9.35355C9.3527 9.25979 9.30002 9.13261 9.30002 9H10.3ZM3.94652 7.8535L1.44652 5.3535L2.15352 4.6465L4.65352 7.1465L3.94652 7.8535ZM1.44652 4.6465L3.94652 2.1465L4.65352 2.8535L2.15352 5.3535L1.44652 4.6465ZM1.80002 4.5H6.80002V5.5H1.80002V4.5ZM10.3 8V9H9.30002V8H10.3ZM6.80002 4.5C7.72828 4.5 8.61851 4.86875 9.27489 5.52513C9.93127 6.1815 10.3 7.07174 10.3 8H9.30002C9.30002 7.33696 9.03663 6.70107 8.56778 6.23223C8.09894 5.76339 7.46306 5.5 6.80002 5.5V4.5Z"
                fill="#303030"
              />
            </g>
            <defs>
              <clipPath id="clip0_137_888">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>Назад</p>
        </span>
        <span className={styles.profile__nav__item__follow}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_148_718)">
              <path
                d="M6.49992 8.63751L4.42492 9.88751C4.33325 9.94584 4.23742 9.97084 4.13742 9.96251C4.03742 9.95417 3.94992 9.92084 3.87492 9.86251C3.79992 9.80417 3.74159 9.73134 3.69992 9.64401C3.65825 9.55667 3.64992 9.45867 3.67492 9.35001L4.22492 6.98751L2.38742 5.40001C2.30409 5.32501 2.25209 5.23951 2.23142 5.14351C2.21075 5.04751 2.21692 4.95384 2.24992 4.86251C2.28292 4.77117 2.33292 4.69617 2.39992 4.63751C2.46692 4.57884 2.55859 4.54134 2.67492 4.52501L5.09992 4.31251L6.03742 2.08751C6.07909 1.98751 6.14375 1.91251 6.23142 1.86251C6.31909 1.81251 6.40859 1.78751 6.49992 1.78751C6.59125 1.78751 6.68075 1.81251 6.76842 1.86251C6.85609 1.91251 6.92075 1.98751 6.96242 2.08751L7.89992 4.31251L10.3249 4.52501C10.4416 4.54167 10.5333 4.57917 10.5999 4.63751C10.6666 4.69584 10.7166 4.77084 10.7499 4.86251C10.7833 4.95417 10.7896 5.04801 10.7689 5.14401C10.7483 5.24001 10.6961 5.32534 10.6124 5.40001L8.77492 6.98751L9.32492 9.35001C9.34992 9.45834 9.34159 9.55634 9.29992 9.64401C9.25825 9.73167 9.19992 9.80451 9.12492 9.86251C9.04992 9.92051 8.96242 9.95384 8.86242 9.96251C8.76242 9.97117 8.66659 9.94617 8.57492 9.88751L6.49992 8.63751Z"
                fill="#FFC446"
              />
            </g>
            <defs>
              <clipPath id="clip0_148_718">
                <rect width="12" height="12" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
          <p>Стать фанатом</p>
        </span>
        <span className={styles.profile__nav__item__subscribe}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_137_723)">
              <path
                d="M8.29779 6.11764C9.24429 6.11764 10.0586 5.2725 10.0586 4.17193C10.0586 3.08464 9.24 2.27914 8.29779 2.27914C7.35579 2.27914 6.537 3.10222 6.537 4.18072C6.537 5.2725 7.35129 6.11764 8.29779 6.11764ZM3.231 6.219C4.04979 6.219 4.76314 5.47929 4.76314 4.524C4.76314 3.57772 4.04529 2.87764 3.231 2.87764C2.41243 2.87764 1.69029 3.59529 1.69479 4.533C1.69479 5.47929 2.40793 6.219 3.23121 6.219M0.774857 10.194H4.12029C3.66257 9.52929 4.22164 8.19107 5.16814 7.46036C4.67957 7.13464 4.04979 6.8925 3.22671 6.8925C1.24136 6.89229 0 8.358 0 9.5775C0 9.97393 0.220071 10.194 0.774857 10.194ZM5.529 10.194H11.0623C11.7534 10.194 12 9.99579 12 9.60836C12 8.47264 10.578 6.90557 8.2935 6.90557C6.01329 6.90557 4.59129 8.47264 4.59129 9.60857C4.59129 9.99579 4.83771 10.194 5.529 10.194Z"
                fill="#A891FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_137_723">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>Подписаться</p>
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
    </div>
  );
};

export default PublicProfilePage;
