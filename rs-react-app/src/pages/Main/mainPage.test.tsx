import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { formSlice } from '../../app/formSlice';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../../app/uiSlice';

const mockStore = configureStore({
  reducer: {
    formData: formSlice.reducer,
    ui: uiSlice.reducer,
  },
});

test('Renders MainPage', () => {
  render(
    <Provider store={mockStore}>
      <MainPage />;
    </Provider>
  );
  expect(screen.getByTestId('mainPage')).toBeInTheDocument();
});
