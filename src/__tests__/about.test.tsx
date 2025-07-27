import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { test } from 'vitest';
import { About } from '../components/About/About';
import '@testing-library/jest-dom';

test('renders about', async () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
  const about = await screen.getByTestId('about');
  expect(about).toBeInTheDocument();
});
