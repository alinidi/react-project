import { configureStore } from '@reduxjs/toolkit';
import selectItemReducer from '../features/selectItem/selectItemSlice';

export const store = configureStore({
  reducer: {
    selectItem: selectItemReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('results', JSON.stringify(state.selectItem.results));
});
