import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  'USA',
  'UKRAINE',
  'RUSSIA',
  'BELARUS',
  'UZBEKISTAN',
  'KAZAKHSTAN',
  'TURKEY',
  'SERBIA',
  'CHINA',
  'JAPAN',
  'POLAND',
  'GERMANY',
  'ENGLAND',
  'ISRAEL',
];

export const countriesSlice = createSlice({
  name: 'countriesSlice',
  initialState,
  reducers: {},
});
