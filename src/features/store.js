import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import categoriesSlice from './categories/categoriesSlice'
import productsSlice from './products/productsSlice'
import userSlice from './user/userSlice'

const rootRedcer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootRedcer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getMiddleware) => getMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(apiSlice.middleware),
  devTools: true
})

export const persistor = persistStore(store)
export default store