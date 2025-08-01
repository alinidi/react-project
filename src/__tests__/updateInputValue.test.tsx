import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Result } from '../components/Result';
import userEvent from '@testing-library/user-event';
import { test } from 'vitest';
import { BrowserRouter } from 'react-router';
import { store } from '../app/store';
import { Provider } from 'react-redux';

test('Updates input value when user types', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Result />
      </BrowserRouter>
    </Provider>
  );
  const input = screen.getByRole('textbox');

  await userEvent.type(input, 'art');
  expect(input).toHaveValue('art');
});
