import { render, screen, waitFor } from '@testing-library/react';
import { it, vi, type MockedFunction } from 'vitest';
import { Result as ResultComponent } from '../components/Result';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { Result } from './../types/types';

vi.mock('./../API/getResults', () => ({ getResults: vi.fn() }));
const mockedGetResults = getResults as MockedFunction<typeof getResults>;

import { getResults } from './../API/getResults';
import { BrowserRouter } from 'react-router';

const currentPage = 1;

beforeEach(() => {
  localStorage.clear();
});

describe('Result Component Tests', () => {
  it('Makes initial API call on component mount', async () => {
    mockedGetResults.mockResolvedValueOnce([]);

    localStorage.setItem('searchedText', 'art');
    render(
      <BrowserRouter>
        <ResultComponent />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getResults).toHaveBeenCalledWith('art', currentPage);
    });
  });

  it('Manages loading states during API calls', async () => {
    localStorage.setItem('searchedText', 'art');

    let resolvePromise: ((value: Result[]) => void) | undefined;
    const promise = new Promise<Result[]>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetResults.mockImplementation(() => promise);

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
