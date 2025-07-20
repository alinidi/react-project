import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Input } from '../common/Input/Input';

test('Renders search input', () => {
  render(<Input searchedText="" handleOnChange={() => {}} />);
  expect(screen.getByPlaceholderText('Search....')).toBeInTheDocument();
});
