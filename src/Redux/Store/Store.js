import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../Slice/authSlice";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: applyMiddleware[thunk],
})

export const persistor = persistStore(store)