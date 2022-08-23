import {configureStore} from "@reduxjs/toolkit";
import {jarvisAPIAuth} from "../ApiProvider/jarvisAPIAuth";
import {jarvisAPIOpen} from "../ApiProvider/jarvisAPIOpen";
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'
import { jarvisReducer } from "../ApiProvider/jarvisSlice";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({[jarvisAPIAuth.reducerPath]: jarvisAPIAuth.reducer, [jarvisAPIOpen.reducerPath]: jarvisAPIOpen.reducer, user: jarvisReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false}).concat([jarvisAPIAuth.middleware, jarvisAPIOpen.middleware]),
});

setupListeners(store.dispatch)

export const persistor = persistStore(store)