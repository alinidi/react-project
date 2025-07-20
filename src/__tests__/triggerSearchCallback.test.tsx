import { it, vi, type Mock } from 'vitest';
import './../API/getResults';
import { render, screen, waitFor } from '@testing-library/react';
import { Result } from '../components/Result';

vi.mock('./../API/getResults', () => ({
  getResults: vi.fn(() => Promise.resolve([])),
}));

import { getResults } from './../API/getResults';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  (getResults as Mock).mockClear();
  localStorage.clear();
});

describe('getResults calls', () => {
  it('Calls getResults on mount with initial search term', async () => {
    await act(async () => {
      render(<Result />);
    });

    await waitFor(() => {
      expect(getResults).toHaveBeenCalled();
    });
  });

  it('Calls getResults on button click with input value', async () => {
    await act(async () => {
      render(<Result />);
    });

    const button = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'art');
    await userEvent.click(button);

    await waitFor(() => {
      expect(getResults).toHaveBeenCalledWith('art');
    });
  });
});
