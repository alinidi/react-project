import { configureStore } from '@reduxjs/toolkit';
import selectItemReducer from '../features/selectItem/selectItemSlice';
import { api } from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    selectItem: selectItemReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

store.subscribe(() => {
  if (typeof window !== 'undefined') {
    const state = store.getState();
    localStorage.setItem('results', JSON.stringify(state.selectItem.results));
  }
});
