import { expect, test, vi } from 'vitest';
import { getResults } from '../API/getResults';
import { act, render } from '@testing-library/react';
import { Result } from '../components/Result';
import { BrowserRouter } from 'react-router';

vi.mock('./../API/getResults', () => ({
  getResults: vi.fn(() => Promise.resolve([])),
}));

const currentPage = 1;

test('Displays previously saved search term from localStorage on mount', async () => {
  localStorage.setItem('searchedText', 'art');
  await act(async () => {
    render(
      <BrowserRouter>
        <Result />
      </BrowserRouter>
    );
  });
  expect(getResults).toHaveBeenCalledWith('art', currentPage);
});
