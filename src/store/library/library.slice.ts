import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book, Category } from '../../models/models';

interface LibraryState {
  allBooks: Book[],
  allCategories: Category[],
  currentBooks: Book[],
  currentCategory : string,
  isSortedByTop: boolean
}

const initialState: LibraryState = {
  allBooks: [],
  allCategories: [],
  currentBooks: [],
  currentCategory: 'Все книги',
  isSortedByTop: true,
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
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
        // return {...state, currentBooks:state.allBooks, currentCategory:'Все книги'}
        currentCategoryName = 'Все книги'
        currentBooks = state.allBooks.map((item) => item)
      } 
      else {
        currentCategoryName = state?.allCategories?.filter(item => item.path === category)[0]?.name
        currentBooks = state.allBooks.filter(item => item.categories.includes(currentCategoryName))
      }
      currentBooks.sort(sortBy)

      return {...state, currentBooks, currentCategory:currentCategoryName}
      // return {...state, currentBooks:state.allBooks.filter(item => item.categories.includes(currentCategoryName)), currentCategory:currentCategoryName}
      
    },
    addCategories(state, action: PayloadAction<Category[]>){ 
      return {...state, allCategories:action.payload}
    },
    filterByRating(state, action: PayloadAction<boolean>) {
      // function sortBy(a:Book, b:Book) {
      //   if(action.payload) {
      //     return b.rating - a.rating
      //   }

      //   return a.rating - b.rating
      // }
      // state.currentBooks.sort(sortBy)
      return {...state, isSortedByTop:action.payload}
      // return {...state, currentBooks:state.currentBooks.sort(sortBy)}
    }
  }
})

export const libraryActions = librarySlice.actions
export const libraryReducer = librarySlice.reducer