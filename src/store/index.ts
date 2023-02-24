// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { libraryApi } from './library/library.api';
import { libraryReducer } from './library/library.slice';

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>