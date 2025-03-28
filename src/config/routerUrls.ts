export const routerUrls = {
  root: '/',
  login: {
    mask: '/login',
    create: () => `/login`,
  },
  profile: {
    mask: '/profile',
    create: () => `/profile`,
  },
  register: {
    mask: '/register',
    create: () => `/register`,
  },
  reset_password: {
    mask: '/reset_password',
    create: () => `/reset_password`,
  },
  public_profile: {
    mask: '/profile/:username',
    create: (username: string) => `/profile/${username}`,
  },
};
