// eslint-disable-next-line import/no-extraneous-dependencies
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { Book, Category, WholeBook } from '../../models/models'


export const libraryApi = createApi({
  reducerPath: 'library/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by'
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, object>,
  // }),
  refetchOnFocus: true,
  endpoints: build => ({
    getBooks: build.query<Book[], void>({
      query: () => ({
        url: 'api/books',
      })
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
  })
})

export const {useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery} = libraryApi