import { it, vi, type Mock } from 'vitest';
import './../API/getResults';
import { render, screen, waitFor } from '@testing-library/react';
import { Result } from '../components/Result';
import { useGetResultsQuery, type api } from '../services/api';

const mockedResult = {
  id: 1,
  title: 'Art Masterpiece',
  artist_display: 'Famous Artist',
  imageUrl: 'url',
};

vi.mock('../services/api', async (importOrigin) => {
  const actual = (await importOrigin()) as typeof api;
  return {
    ...actual,
    useGetResultsQuery: vi.fn((args, options) => {
      if (
        (args.searchedText === 'art' && args.page === 1,
        options.refetchOnMountOrArgChange === true)
      ) {
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

import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { store } from '../app/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  (useGetResultsQuery as Mock).mockClear();
  localStorage.clear();
});

describe('getResults calls', () => {
  it('Calls getResults on mount with initial search term', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Result />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(useGetResultsQuery).toHaveBeenCalled();
    });
  });

  it('Calls getResults on button click with input value', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Result />
          </BrowserRouter>
        </Provider>
      );
    });

    const button = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'art');
    await userEvent.click(button);

    await waitFor(() => {
      expect(useGetResultsQuery).toHaveBeenCalledWith(
        { searchedText: 'art', page: 1 },
        { refetchOnMountOrArgChange: true }
      );
    });
  });
});
