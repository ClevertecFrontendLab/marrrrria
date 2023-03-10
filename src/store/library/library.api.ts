// eslint-disable-next-line import/no-extraneous-dependencies
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { Book, Category, WholeBook } from '../../models/models'


export const libraryApi = createApi({
  reducerPath: 'library/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('JWT');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, object>,
  endpoints: build => ({
    getBooks: build.query<Book[], void>({
      query: () => ({
        url: 'api/books',
      }),
      // refetchOnFocus: true,
    }),
    getBook: build.query<WholeBook, number>({
      query: (id: number) => ({
        url: `api/books/${id}`,
      })
    }),
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: 'api/categories',
      })
    }),
    signIn: build.mutation ({
      query: (body) => ({
        url: 'api/auth/local',
        method: 'POST',
        body,
      })
    }),
    registerUser: build.mutation ({
      query: (body) => ({
        url: 'api/auth/local/register',
        method: 'POST',
        body,
      })
    }),
    sendEmail: build.mutation ({
      query: (body) => ({
        url: 'api/auth/forgot-password',
        method: 'POST',
        body,
      })
    }),
    resetPassword: build.mutation ({
      query: (body) => ({
        url: 'api/auth/reset-password',
        method: 'POST',
        body,
      })
    }),
  })
})

export const {useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery, useSignInMutation, useRegisterUserMutation, useSendEmailMutation, useResetPasswordMutation} = libraryApi