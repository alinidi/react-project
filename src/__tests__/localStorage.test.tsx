import { expect, test, vi } from 'vitest';
import { getResults } from '../API/getResults';
import { act, render } from '@testing-library/react';
import { Result } from '../components/Result';

vi.mock('./../API/getResults', () => ({
  getResults: vi.fn(() => Promise.resolve([])),
}));

test('Displays previously saved search term from localStorage on mount', async () => {
  localStorage.setItem('searchedText', 'art');
  await act(async () => {
    render(<Result />);
  });
  expect(getResults).toHaveBeenCalledWith('art');
});
