import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from '../../app/formSlice';
import { ReactHookForm } from './ReactHookForm';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: {
    formData: formSlice.reducer,
  },
});

test('Renders ReactHookForm', () => {
  render(
    <Provider store={mockStore}>
      <ReactHookForm onSubmitSuccess={() => {}} />
    </Provider>
  );
  expect(screen.getByTestId('reactHookForm')).toBeInTheDocument();
});

test.skip('Submits ReactHookForm and calls onSubmitSuccess', async () => {
  const onSubmitSuccess = vi.fn();

  render(
    <Provider store={mockStore}>
      <ReactHookForm onSubmitSuccess={onSubmitSuccess} />
    </Provider>
  );

  //заполняю поля
  const [nameInput] = screen.getAllByTestId('name');
  await userEvent.type(nameInput, 'Katya');
  await userEvent.type(screen.getByTestId('age'), '32');
  await userEvent.type(screen.getByTestId('email'), 'test@example.com');
  await userEvent.type(screen.getByTestId('password'), '123456');
  await userEvent.type(screen.getByTestId('confirmPassword'), '123456');
  await userEvent.click(screen.getByTestId('female'));
  await userEvent.click(screen.getByTestId('accept'));
  const countryInput = screen.getByRole('textbox', { name: /country/i });
  const file = new File(['dummy'], 'test.png', { type: 'image/png' });
  await userEvent.upload(screen.getByTestId('image'), file);
  await userEvent.type(countryInput, 'USA');

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitButton);

  expect(onSubmitSuccess).toHaveBeenCalled();
});
