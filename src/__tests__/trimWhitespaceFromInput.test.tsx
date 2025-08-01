import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Result } from '../components/Result';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { store } from '../app/store';
import { Provider } from 'react-redux';

test('Trims whitespace from search input before saving', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Result />
      </BrowserRouter>
    </Provider>
  );
  const input = screen.getByRole('textbox');

  await userEvent.type(input, ' art ');
  await expect(input).toHaveValue('art');
});
