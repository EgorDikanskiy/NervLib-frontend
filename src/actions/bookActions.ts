import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from 'config/apiRoutes';

export const getBooks = createAsyncThunk('books/', async (params: { authorId?: string }, { rejectWithValue }) => {
  try {
    if (params.authorId) {
      const response = await axios.get(`${apiRoutes.books}?author_id=${params.authorId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }
    const response = await axios.get(apiRoutes.books, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

// export const login = createAsyncThunk(
//   'auth/login',
//   async (userData: { login: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(apiRoutes.login, userData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       }
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
//   try {
//     const accessToken = localStorage.getItem('access_token');

//     if (!accessToken) {
//       return rejectWithValue('Токен отсутствует');
//     }

//     const response = await axios.get(apiRoutes.curentUser, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       return rejectWithValue(error.response.data.detail || error.response.data);
//     }
//     return rejectWithValue(error.message);
//   }
// });

// export const resetError = createAction('auth/resetError');

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { apiRoutes } from 'config/apiRoutes';

// interface Book {
//   id: number;
//   author_id: number;
//   name: string;
//   title: string;
//   description: string;
//   poster_url: string;
//   age_rating: string;
//   views_count: number;
//   chapter_count: number;
//   favourites_count: number;
//   published_date: string;
// }

// // "id": 1,
// // "author_id": 1,
// // "name": "pizza-vkusna",
// // "title": "Как мы пиццу ели и сайтик делали",
// // "description": "Это история о том, как мы вышли за границы... то есть за сырные бортики",
// // "poster_url": "Картинко.jpg",
// // "age_rating": "12+",
// // "views_count": 24897,
// // "chapter_count": 2,
// // "favourites_count": 898,
// // "published_date": "2025-03-27",

// export const catalogApi = createApi({
//   reducerPath: 'catalogSlice',
//   baseQuery: fetchBaseQuery({ baseUrl: apiRoutes.books }),
//   endpoints: (builder) => ({
//     // getBooks: builder.query<Book[], { filters: string; sort: string }>({
//     //   query: (args) => `/?sort=${args.sort}/?filter=${args.filters}`,
//     // }),
//     getBooks: builder.query<Book[], void>({
//       query: () => `?author_id=0`,
//     }),
//     getBookByName: builder.query<Book, string>({
//       query: (bookName: string) => `/${bookName}`,
//     }),
//   }),
// });

// export const { useGetBooksQuery, useGetBookByNameQuery, useLazyGetBooksQuery, useLazyGetBookByNameQuery } = catalogApi;
