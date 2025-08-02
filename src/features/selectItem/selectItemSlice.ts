import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectState {
  count: number;
  results: number[];
}

const savedResults = JSON.parse(localStorage.getItem('results') || '[]');

const initialState: SelectState = {
  count: savedResults ? savedResults.length : 0,
  results: savedResults ? savedResults : [],
};

function filterResults(results: number[], item: number) {
  const filteredArray = results.filter((result) => result !== item);
  return filteredArray;
}

export const selectItemReducer = createSlice({
  name: 'selectItem',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      if (!state.results.includes(action.payload)) {
        state.count += 1;
        state.results.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.count -= 1;
      state.results = filterResults(state.results, action.payload);
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
