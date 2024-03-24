import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeMode from './themeMode';

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeMode
    }
})

export default store;