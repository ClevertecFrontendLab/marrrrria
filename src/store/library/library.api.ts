// eslint-disable-next-line import/no-extraneous-dependencies
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { Book, Category, WholeBook } from '../../models/models'


export const libraryApi = createApi({
  reducerPath: 'library/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by'
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
  })
})

export const {useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery, useSignInMutation, useRegisterUserMutation} = libraryApi