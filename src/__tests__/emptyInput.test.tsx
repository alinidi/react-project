import { act, render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Result } from '../components/Result';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('Shows empty input when no saved term exists', async () => {
  localStorage.clear();

  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  });

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});
