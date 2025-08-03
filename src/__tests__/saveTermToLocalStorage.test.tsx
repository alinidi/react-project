import { render, screen, waitFor } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Result } from '../components/Result';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router';
import { store } from '../app/store';
import { Provider } from 'react-redux';

test('Save search term to localStorage when search button is clicked', async () => {
  vi.mock('./../API/getResults', () => ({
    getResults: vi.fn(() => Promise.resolve([])),
  }));

  localStorage.clear();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Result />
      </BrowserRouter>
    </Provider>
  );
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: 'Search' });

  await userEvent.type(input, 'art');
  await userEvent.click(button);

  await waitFor(() => {
    expect(localStorage.getItem('searchedText')).toBe('art');
  });
});
