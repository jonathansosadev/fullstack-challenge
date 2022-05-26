import { configureStore } from '@reduxjs/toolkit';
// Reducers
import data from './slices/data';

export const store = configureStore({
  reducer: {
    data
  },
});