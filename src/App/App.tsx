import React from 'react';
import { Routes, Route, BrowserRouter, HashRouter, Navigate } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RootLayout from 'components/RootLayout';
import { routerUrls } from 'config/routerUrls';
import EditProfilePage from './pages/Auth/EditProfilePage';
import Login from './pages/Auth/LoginPage';
import MailConfirmation from './pages/Auth/MailConfirmation';
import ProfilePage from './pages/Auth/ProfilePage';
import Registration from './pages/Auth/RegistrationPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import CatalogPage from './pages/CatalogPage';
import DetailComicsPage from './pages/DetailComicsPage';
import PublicProfilePage from './pages/PublicProfilePage';

function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={routerUrls.register.mask} replace />} />
          <Route path={routerUrls.register.mask} element={<Registration />} />
          <Route path={routerUrls.login.mask} element={<Login />} />
          <Route path={routerUrls.catalog.mask} element={<CatalogPage />} />
          <Route path={routerUrls.confirm_mail.mask} element={<MailConfirmation />} />
          <Route path={routerUrls.public_profile.mask} element={<PublicProfilePage />} />
          <Route path={routerUrls.book_detail.mask} element={<DetailComicsPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={routerUrls.profile.mask} element={<ProfilePage />} />
            <Route path={routerUrls.edit_profile.mask} element={<EditProfilePage />} />
            <Route path={routerUrls.reset_password.mask} element={<ResetPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}
export default App;
