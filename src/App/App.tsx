import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RootLayout from 'components/RootLayout';
import { routerUrls } from 'config/routerUrls';
import Login from './pages/Auth/LoginPage';
import ProfilePage from './pages/Auth/ProfilePage';
import Registration from './pages/Auth/RegistrationPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';

function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path={routerUrls.register.mask} element={<Registration />} />
          <Route path={routerUrls.login.mask} element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path={routerUrls.profile.mask} element={<ProfilePage />} />
            <Route path={routerUrls.reset_password.mask} element={<ResetPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}
export default App;
