import { render, screen, waitFor } from '@testing-library/react';
import { it, vi, type MockedFunction } from 'vitest';
import { Result as ResultComponent } from '../components/Result';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { Result } from './../types/types';

vi.mock('./../API/getResults', () => ({ getResults: vi.fn() }));
const mockedGetResults = getResults as MockedFunction<typeof getResults>;

import { getResults } from './../API/getResults';

beforeEach(() => {
  localStorage.clear();
});

describe('Result Component Tests', () => {
  it('Makes initial API call on component mount', async () => {
    mockedGetResults.mockResolvedValueOnce([]);

    localStorage.setItem('searchedText', 'art');
    render(<ResultComponent />);

    await waitFor(() => {
      expect(getResults).toHaveBeenCalledWith('art');
    });
  });

  it('Manages loading states during API calls', async () => {
    localStorage.setItem('searchedText', 'art');

    let resolvePromise: ((value: Result[]) => void) | undefined;
    const promise = new Promise<Result[]>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetResults.mockImplementation(() => promise);

    render(<ResultComponent />);
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
