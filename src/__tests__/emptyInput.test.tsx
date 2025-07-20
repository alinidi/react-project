import { act, render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Result } from '../components/Result';
import '@testing-library/jest-dom';

test('Shows empty input when no saved term exists', async () => {
  localStorage.clear();

  await act(async () => {
    render(<Result />);
  });

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});
