const API_BASE = 'https://backend-dev.nervlib.ru/api';
const createApiRoute = (route: string) => `${API_BASE}${route}`;

export const apiRoutes = {
  login: createApiRoute('/auth/signin'),
  register: createApiRoute('/auth/signup'),
  curentUser: createApiRoute('/auth/current'),
  books: createApiRoute('/books'),
  refresh: createApiRoute('/auth/refresh'),
  profile: createApiRoute('/profile'),
  bookOnSlug: (slug: string) => createApiRoute(`/books/${slug}`),
  chapters: createApiRoute('/chapters'),
  images: createApiRoute('/images'),
};
