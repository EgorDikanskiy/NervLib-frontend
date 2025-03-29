import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRoutes } from 'config/apiRoutes';

interface Book {
  id: number;
  author_id: number;
  name: string;
  title: string;
  description: string;
  poster_url: string;
  age_rating: string;
  views_count: number;
  chapter_count: number;
  favourites_count: number;
  published_date: string;
}

// "id": 1,
// "author_id": 1,
// "name": "pizza-vkusna",
// "title": "Как мы пиццу ели и сайтик делали",
// "description": "Это история о том, как мы вышли за границы... то есть за сырные бортики",
// "poster_url": "Картинко.jpg",
// "age_rating": "12+",
// "views_count": 24897,
// "chapter_count": 2,
// "favourites_count": 898,
// "published_date": "2025-03-27",

export const catalogApi = createApi({
  reducerPath: 'catalogSlice',
  baseQuery: fetchBaseQuery({ baseUrl: apiRoutes.books }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], { filters: string; sort: string }>({
      query: (args) => `/?sort=${args.sort}/?filter=${args.filters}`,
    }),
    getBookByName: builder.query<Book, string>({
      query: (bookName: string) => `/${bookName}`,
    }),
  }),
});

// getBooks: builder.query<Book[], { filters: string; sort: string }>({
//   query: (args) => `books?filters=${args.filters}&sort=${args.sort}`,
// }),

export const { useGetBooksQuery, useGetBookByNameQuery, useLazyGetBooksQuery, useLazyGetBookByNameQuery } = catalogApi;
