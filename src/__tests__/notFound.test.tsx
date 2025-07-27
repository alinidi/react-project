import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { NotFound } from '../components/NotFound/NotFound';
import '@testing-library/jest-dom';

test('renders NotFound', async () => {
  render(<NotFound />);
  const notFound = await screen.getByText('Page not found');
  expect(notFound).toBeInTheDocument();
});
