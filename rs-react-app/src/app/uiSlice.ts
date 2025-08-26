import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialType = {
  activeModal: 'first' | 'second' | null;
};

const initialState: InitialType = {
  activeModal: null,
};

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<'first' | 'second'>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
  },
});
