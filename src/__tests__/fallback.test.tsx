import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Fallback } from '../components/Fallback/Fallback';
import '@testing-library/jest-dom';

test('Fallback renders', async () => {
  render(<Fallback />);
  const fallback = await screen.getByText('Something went wrong');
  expect(fallback).toBeInTheDocument();
});
