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
  catalog: {
    mask: '/catalog',
    create: () => `/catalog`,
  },
};
