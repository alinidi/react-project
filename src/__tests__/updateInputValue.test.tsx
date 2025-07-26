import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Result } from '../components/Result';
import userEvent from '@testing-library/user-event';
import { test } from 'vitest';
import { BrowserRouter } from 'react-router';

test('Updates input value when user types', async () => {
  render(
    <BrowserRouter>
      <Result />
    </BrowserRouter>
  );
  const input = screen.getByRole('textbox');

  await userEvent.type(input, 'art');
  expect(input).toHaveValue('art');
});
