import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './uiSlice';
import { formSlice } from './formSlice';
import { countriesSlice } from './countriesSlice';

export type RootState = ReturnType<typeof store.getState>;

export const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  formData: formSlice.reducer,
  countries: countriesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
