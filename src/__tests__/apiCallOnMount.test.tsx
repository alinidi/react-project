import { render, screen, waitFor } from '@testing-library/react';
import { it, vi, type MockedFunction } from 'vitest';
import { Result as ResultComponent } from '../components/Result';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { Result } from './../types/types';

vi.mock('./../API/getResults', () => ({ getResults: vi.fn() }));
const mockedGetResults = getResults as MockedFunction<typeof getResults>;

vi.mock('./../API/getPaginationInfo', () => ({ getPaginationInfo: vi.fn() }));
const mockedGetPaginationInfo = getPaginationInfo as MockedFunction<
  typeof getPaginationInfo
>;

import { getResults } from './../API/getResults';
import { BrowserRouter } from 'react-router';
import { getPaginationInfo } from '../API/getPaginationInfo';

const currentPage = 1;

beforeEach(() => {
  localStorage.clear();
});

describe('Result Component Tests', () => {
  it.skip('Makes initial API call on component mount', async () => {
    mockedGetResults.mockResolvedValueOnce([]);
    mockedGetPaginationInfo.mockResolvedValueOnce({
      current_page: 1,
      total_pages: 10,
    });

    localStorage.setItem('searchedText', 'art');

    render(
      <BrowserRouter>
        <ResultComponent />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getResults).toHaveBeenCalledWith('art', currentPage);
    });

    await waitFor(() => {
      expect(getPaginationInfo).toHaveBeenCalledWith('art', currentPage);
    });
  });

  it.skip('Manages loading states during API calls', async () => {
    localStorage.setItem('searchedText', 'art');

    let resolvePromise: ((value: Result[]) => void) | undefined;
    const promise = new Promise<Result[]>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetResults.mockImplementation(() => promise);
    mockedGetPaginationInfo.mockResolvedValueOnce({
      current_page: 1,
      total_pages: 10,
    });

    render(
      <BrowserRouter>
        <ResultComponent />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    const result = screen.getByTestId('result');

    await userEvent.click(button);

    expect(result).toHaveClass(/loading/);

    if (resolvePromise) {
      resolvePromise([]);
    }

    await waitFor(() => {
      expect(result).not.toHaveClass(/loading/);
    });
  });
});
