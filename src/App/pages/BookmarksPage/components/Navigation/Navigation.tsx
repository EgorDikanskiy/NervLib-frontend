import React from 'react';
import styles from './Navigation.module.scss';

export type BookmarkSection = 'all' | 'reading' | 'will_read' | 'read';

interface NavigationProps {
  activeSection: BookmarkSection;
  onSectionChange: (section: BookmarkSection) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <ul className={styles.navigation}>
      <li
        className={`${styles.navigation__item} ${activeSection === 'all' ? styles.active : ''}`}
        onClick={() => onSectionChange('all')}
      >
        <p>Все</p>
      </li>
      <li
        className={`${styles.navigation__item} ${activeSection === 'reading' ? styles.active : ''}`}
        onClick={() => onSectionChange('reading')}
      >
        <p>Рекомендую</p>
      </li>
      <li
        className={`${styles.navigation__item} ${activeSection === 'will_read' ? styles.active : ''}`}
        onClick={() => onSectionChange('will_read')}
      >
        <p>Буду читать</p>
      </li>
    </ul>
  );
};

export default Navigation;
