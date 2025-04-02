import React from 'react';
import { useLocation } from 'react-router-dom';
import { BookmarksIcon } from 'components/ui/icons/BookmarksIcon';
import { CatalogIcon } from 'components/ui/icons/CatalogIcon';
import { HomeIcon } from 'components/ui/icons/HomeIcon';
import { ProfileIcon } from 'components/ui/icons/ProfileIcon';
import { routerUrls } from 'config/routerUrls';
import styles from './TabBar.module.scss';

const TabBar = () => {
  const location = useLocation();
  return (
    <ul className={styles.tapBar}>
      <li>
        <a href={routerUrls.root}>
          <HomeIcon active={location.pathname === routerUrls.root} />
        </a>
      </li>
      <li>
        <a href={routerUrls.catalog.mask}>
          <CatalogIcon active={location.pathname === routerUrls.catalog.mask} />
        </a>
      </li>
      <li>
        <a href={routerUrls.bookmarks.mask}>
          <BookmarksIcon active={location.pathname === routerUrls.bookmarks.mask} />
        </a>
      </li>
      <li>
        <a href={routerUrls.profile.mask}>
          <ProfileIcon
            active={
              location.pathname === routerUrls.profile.mask ||
              location.pathname === routerUrls.login.mask ||
              location.pathname === routerUrls.register.mask ||
              location.pathname === routerUrls.confirm_mail.mask
            }
          />
        </a>
      </li>
    </ul>
  );
};

export default TabBar;
