import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ViewComicsPage.module.scss';

const images = [
  {
    id: 1,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 2,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 3,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 4,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 5,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 6,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 7,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 8,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 9,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 10,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
];

const ViewComicsPage = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <section>
        <span className={`${styles.nav} ${showNav ? styles.visible : styles.hidden}`} onClick={() => navigate(-1)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_137_888)">
              <path
                d="M1.8 5L1.45 5.35L1.1 5L1.45 4.65L1.8 5ZM10.3 9C10.3 9.13 10.25 9.26 10.15 9.35C10.06 9.45 9.93 9.5 9.8 9.5C9.67 9.5 9.54 9.45 9.45 9.35C9.35 9.26 9.3 9.13 9.3 9H10.3ZM3.95 7.85L1.45 5.35L2.15 4.65L4.65 7.15L3.95 7.85ZM1.45 4.65L3.95 2.15L4.65 2.85L2.15 5.35L1.45 4.65ZM1.8 4.5H6.8V5.5H1.8V4.5ZM10.3 8V9H9.3V8H10.3ZM6.8 4.5C7.73 4.5 8.62 4.87 9.27 5.53C9.93 6.18 10.3 7.07 10.3 8H9.3C9.3 7.34 9.04 6.7 8.57 6.23C8.1 5.76 7.46 5.5 6.8 5.5V4.5Z"
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
      </section>
      <section className={styles.viewBox}>
        {images.map((image: { id: number; chapter_id: number; url: string }) => (
          <div key={image.id}>
            <img src={image.url} alt="фото" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ViewComicsPage;
