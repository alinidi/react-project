import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectState {
  count: number;
  results: string[];
}

const initialState: SelectState = {
  count: 0,
  results: [],
};

function filterResults(results: string[], item: string) {
  const filteredArray = results.filter((result) => result !== item);
  return filteredArray;
}

export const selectItemReducer = createSlice({
  name: 'selectItem',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      if (!state.results.includes(action.payload)) {
        state.count += 1;
        state.results.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
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
