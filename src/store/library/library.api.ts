// eslint-disable-next-line import/no-extraneous-dependencies
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { Book, Category, WholeBook } from '../../models/models'

export const libraryApi = createApi({
  reducerPath: 'library/api',
  baseQuery: fetchBaseQuery( {
    baseUrl: 'https://strapi.cleverland.by'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getBooks: build.query<Book[], null>({
      query: () => ({
        url: 'api/books',
      })
    }),
    getBook: build.query<WholeBook, number>({
      query: (id: number) => ({
        url: `api/books/${id}`,
      })
    }),
    getCategories: build.query<Category[], null>({
      query: () => ({
        url: 'api/categories',
      })
    }),
  })
})

export const {useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery} = libraryApi