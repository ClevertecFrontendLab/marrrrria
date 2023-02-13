// eslint-disable-next-line import/no-extraneous-dependencies
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const libraryApi = createApi({
  reducerPath: 'library/api',
  baseQuery: fetchBaseQuery( {
    baseUrl: 'https://strapi.cleverland.by'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getBooks: build.query<any, any>({
      query: () => ({
        url: 'api/books',
      })
    }),
    getBook: build.query<any, any>({
      query: (id: number) => ({
        url: `api/books/${id}`,
      })
    }),
    getCategories: build.query<any, any>({
      query: () => ({
        url: 'api/categories',
      })
    }),
  })
})

export const {useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery} = libraryApi