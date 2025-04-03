import ViewComicsPage from 'App/pages/ViewComicsPage';

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
  confirm_mail: {
    mask: '/confirm_mail',
    create: () => `/confirm_mail`,
  },
  public_profile: {
    mask: '/profile/:username',
    create: (username: string) => `/profile/${username}`,
  },
  edit_profile: {
    mask: '/edit_profile',
    create: () => `/edit_profile`,
  },
  bookmarks: {
    mask: '/bookmarks',
    create: () => `/bookmarks`,
  },
  viewComics: {
    mask: '/view/:comicsName/:chapter',
    create: (comicsName: string, chapter: number) => `/view/${comicsName}/${chapter}`,
  },
  book_detail: {
    mask: '/comics/:slug',
    create: (slug: string) => `/comics/${slug}`,
  },
};
