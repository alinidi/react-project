import { expect, test, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Result } from '../components/Result';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom';
import type { api } from '../services/api';

const mockedResult = {
  id: 1,
  title: 'Art Masterpiece',
  artist_display: 'Famous Artist',
  imageUrl: 'url',
};

vi.mock('../services/api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof api;

  return {
    ...actual,
    useGetResultsQuery: vi.fn(({ searchedText, page }) => {
      if (searchedText === 'art' && page === 1) {
        return {
          data: [mockedResult],
          isLoading: false,
          error: null,
        };
      }
      return { data: [], isLoading: false, error: null };
    }),
  };
});

test('Displays previously saved search term from localStorage on mount', async () => {
  localStorage.setItem('searchedText', 'art');
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  });

  expect(await screen.findByText(/Art Masterpiece/i)).toBeInTheDocument();
});
