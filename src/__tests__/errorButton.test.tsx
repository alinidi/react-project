import { render, screen, waitFor } from '@testing-library/react';
import { test, vi } from 'vitest';
import { ErrorButton } from '../components/ErrorButton/ErrorButton';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import '@testing-library/jest-dom';

test('Throws error when test button is clicked', async () => {
  const spyLog = vi.spyOn(console, 'log');

  render(
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );

  const button = screen.getByRole('button', { name: 'Crush test' });

  await userEvent.click(button);
  await waitFor(() => {
    expect(spyLog).toHaveBeenCalled();
    const [error] = spyLog.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Crush test');
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
