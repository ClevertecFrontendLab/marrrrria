import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, Category } from "../../models/models";

interface LibraryState {
  allBooks: Book[],
  allCategories: Category[],
  currentBooks: Book[],
  // currentCategoryName : string
}

const initialState: LibraryState = {
  allBooks: [],
  allCategories: [],
  currentBooks: [],
  // currentCategoryName: 'Все книги'
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addBooks(state, action: PayloadAction<Book[]>) {
      // state.allBooks.push(...action.payload)
      return {...state, allBooks:action.payload}
    },
    addCurrentBooks(state, action: PayloadAction<string>) {
      console.log(action.payload)
      const category = action.payload


      if (category === 'all') {
        return {...state, currentBooks:state.allBooks}
      }
      const currentCategoryName = state?.allCategories?.filter(item => item.path === category)[0]?.name
      return {...state, currentBooks:state.allBooks.filter(item => item.categories.includes(currentCategoryName))}
      
    },
    addCategories(state, action: PayloadAction<Category[]>){
      return {...state, allCategories:action.payload}
    }
  }
})

export const libraryActions = librarySlice.actions
export const libraryReducer = librarySlice.reducer