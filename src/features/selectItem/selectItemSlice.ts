import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Result } from '../../types/types';

interface SelectState {
  count: number;
  results: Result[];
}

const initialState: SelectState = {
  count: 0,
  results: [],
};

export function filterResults(results: Result[], item: number) {
  return results.filter((result) => result.id !== item);
}

export const selectItemReducer = createSlice({
  name: 'selectItem',
  initialState,
  reducers: {
    hydrateFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        try {
          const saved = JSON.parse(
            localStorage.getItem('results') || '[]'
          ) as Result[];
          state.results = saved;
          state.count = saved.length;
        } catch {
          state.results = [];
          state.count = 0;
        }
      }
    },
    addItem: (state, action: PayloadAction<Result>) => {
      if (!state.results.find((result) => result.id === action.payload.id)) {
        state.count += 1;
        state.results.push(action.payload);
        localStorage.setItem('results', JSON.stringify(state.results));
      }
    },
    removeItem: (state, action: PayloadAction<Result>) => {
      state.results = filterResults(state.results, action.payload.id);
      state.count = state.results.length;
      localStorage.setItem('results', JSON.stringify(state.results));
    },
    removeAllItems: (state) => {
      state.count = 0;
      state.results = [];
      localStorage.setItem('results', JSON.stringify([]));
    },
  },
});

export const { addItem, removeItem, removeAllItems, hydrateFromStorage } =
  selectItemReducer.actions;
export default selectItemReducer.reducer;
