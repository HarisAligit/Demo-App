import {configureStore} from "@reduxjs/toolkit";
import {jarvisApi} from "../ApiProvider/jarvisAPI";
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'
import { jarvisReducer } from "../ApiProvider/jarvisSlice";
import {persistReducer, persistStore} from "redux-persist";

// const persistConfig = {
//   key: 'root',
//   storage
// }
//
// const persistedReducer = persistReducer(persistConfig, {
//   [jarvisApi.reducerPath]: jarvisApi.reducer,
// })

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, jarvisReducer)

export const store = configureStore({
  reducer: {
    [jarvisApi.reducerPath]: jarvisApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false}).concat(jarvisApi.middleware),
});

setupListeners(store.dispatch)

// export const addStore = configureStore({
//   reducer: persistedReducer,
// })

export const persistor = persistStore(store)