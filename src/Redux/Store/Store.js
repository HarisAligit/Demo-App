import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {jarvisApi} from "../Slice/authSlice";
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'

import thunk from "redux-thunk";
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

// const persistConfig = {
//   key: 'root',
//   storage
// }
//
// const persistedReducer = persistReducer(persistConfig, {
//   [jarvisApi.reducerPath]: jarvisApi.reducer,
// })

export const store = configureStore({
  reducer: {
    [jarvisApi.reducerPath]: jarvisApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jarvisApi.middleware),
});

setupListeners(store.dispatch)