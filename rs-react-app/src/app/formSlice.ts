import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type InitialState = {
  name: string;
  age: number;
  email: string;
  gender: string;
  accept: boolean;
  image: string | null;
  country: string;
};

const initialState: InitialState = {
  name: '',
  age: 0,
  email: '',
  gender: '',
  accept: false,
  image: null,
  country: '',
};

export const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<InitialState>) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.accept = action.payload.accept;
      state.image = action.payload.image;
      state.country = action.payload.country;
    },
  },
});
