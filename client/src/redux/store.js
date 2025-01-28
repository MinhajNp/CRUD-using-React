import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./user/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({user: useReducer});

const presistConfig ={
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    }),
});

export const persistor = persistStore(store);