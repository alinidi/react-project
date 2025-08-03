import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Result } from '../../types/types';

interface SelectState {
  count: number;
  results: Result[];
}

const savedResults = JSON.parse(localStorage.getItem('results') || '[]');

const initialState: SelectState = {
  count: savedResults ? savedResults.length : 0,
  results: savedResults ? savedResults : [],
};

export function filterResults(results: Result[], item: number) {
  const filteredArray = results.filter((result) => result.id !== item);
  return filteredArray;
}

export const selectItemReducer = createSlice({
  name: 'selectItem',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Result>) => {
      if (!state.results.find((result) => result.id === action.payload.id)) {
        state.count += 1;
        state.results.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<Result>) => {
      state.count -= 1;
      state.results = filterResults(state.results, action.payload.id);
    },
    removeAllItems: (state) => {
      state.count = 0;
      state.results = [];
    },
  },
});

export const { addItem, removeItem, removeAllItems } =
  selectItemReducer.actions;
export default selectItemReducer.reducer;
