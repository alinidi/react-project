import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../common/Button/Button';

test('Renders search button', () => {
  render(<Button handleOnClick={() => {}}>Search</Button>);
  expect(screen.getByText('Search')).toBeInTheDocument();
});
