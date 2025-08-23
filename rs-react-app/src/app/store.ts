import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './uiSlice';

export type RootState = ReturnType<typeof store.getState>;

export const rootReducer = combineReducers({
  ui: uiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
