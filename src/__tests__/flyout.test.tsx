import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Flyout } from '../common/Flyout/Flyout';
import '@testing-library/jest-dom';

const handleUnselect = () => console.log('hey');

test('Renders Flyout component', () => {
  render(<Flyout count={1} handleUnselect={handleUnselect} url={'url'} />);

  expect(screen.getByTestId('flyout')).toBeInTheDocument();
});
