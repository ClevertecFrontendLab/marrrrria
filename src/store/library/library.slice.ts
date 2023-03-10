import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Category } from '../../models/models';

interface LibraryState {
  allBooks: Book[],
  allCategories: Category[],
  currentBooks: Book[],
  currentCategory : string,
  isSortedByTop: boolean,
  searchValue: string,
  isAuthorized: boolean,
}

const initialState: LibraryState = {
  allBooks: [],
  allCategories: [],
  currentBooks: [],
  currentCategory: 'Все книги',
  isSortedByTop: true,
  searchValue: '',
  isAuthorized: !!localStorage.getItem("JWT"),
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      return {...state, searchValue:action.payload}
    },
    addBooks(state, action: PayloadAction<Book[]>) {
      return {...state, allBooks:action.payload}
    },
    addCurrentBooks(state, action: PayloadAction<string>) {
      function sortBy(a:Book, b:Book) {
        if(state.isSortedByTop) {
          return b.rating - a.rating
        }

        return a.rating - b.rating
      }

      const category = action.payload
      let currentCategoryName = ''
      let currentBooks = []

      if (category === 'all') {
        currentCategoryName = 'Все книги'
        currentBooks = state.allBooks.map((item) => item)
      }
      else {
        currentCategoryName = state?.allCategories?.filter(item => item.path === category)[0]?.name
        currentBooks = state.allBooks.filter(item => item.categories.includes(currentCategoryName))
      }
      currentBooks.sort(sortBy)

      return {...state, currentBooks, currentCategory:currentCategoryName}

    },
    addCategories(state, action: PayloadAction<Category[]>){
      return {...state, allCategories:action.payload}
    },
    filterByRating(state, action: PayloadAction<boolean>) {
      return {...state, isSortedByTop:action.payload}
    },
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      return {...state, isAuthorized:action.payload}
    }
  }
})

export const libraryActions = librarySlice.actions
export const libraryReducer = librarySlice.reducer
