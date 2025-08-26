import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UncontrolledForm } from './UncontrolledForm';
import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from '../../app/formSlice';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore({
  reducer: {
    formData: formSlice.reducer,
  },
});

test('Renders form', () => {
  render(
    <Provider store={mockStore}>
      <UncontrolledForm onSubmitSuccess={() => {}} />
    </Provider>
  );
  expect(screen.getByTestId('uncontrolledForm')).toBeInTheDocument();
});

test('Submits form and calls onSubmitSuccess', async () => {
  const onSubmitSuccess = vi.fn();

  render(
    <Provider store={mockStore}>
      <UncontrolledForm onSubmitSuccess={onSubmitSuccess} />
    </Provider>
  );

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitButton);

  expect(onSubmitSuccess).toHaveBeenCalled();
});
