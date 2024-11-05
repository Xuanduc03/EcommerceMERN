import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import mặc định từ userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // Gắn reducer của user vào store
  },
});
