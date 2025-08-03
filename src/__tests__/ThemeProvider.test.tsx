import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ThemeProvider } from '../features/ThemeContext/ThemeProvider';
import '@testing-library/jest-dom';

describe('ThemeContextProvider', () => {
  it('renders themeContextProvider', () => {
    render(<ThemeProvider>Children</ThemeProvider>);
    expect(screen.getByTestId('themeProvider')).toBeInTheDocument();
  });
});
