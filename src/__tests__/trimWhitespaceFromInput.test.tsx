import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Result } from '../components/Result';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

test('Trims whitespace from search input before saving', async () => {
  render(
    <BrowserRouter>
      <Result />
    </BrowserRouter>
  );
  const input = screen.getByRole('textbox');

  await userEvent.type(input, ' art ');
  await expect(input).toHaveValue('art');
});
