import { configureStore } from '@reduxjs/toolkit';
import selectItemReducer from '../features/selectItem/selectItemSlice';

export const store = configureStore({
  reducer: {
    selectItem: selectItemReducer,
  },
});
