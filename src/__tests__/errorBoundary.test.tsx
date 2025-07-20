import { render, screen, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import '@testing-library/jest-dom';

describe('errorBoundary', () => {
  it('Catches and handles JavaScript errors in child components', async () => {
    const ProblemComponent = () => {
      throw new Error('Crashed');
    };

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    const fallback = await screen.getByText('Something went wrong');

    await waitFor(() => {
      expect(fallback);
    });
  });

  it('Logs error to console', async () => {
    const spyLog = vi.spyOn(console, 'log');

    const ProblemComponent = () => {
      throw new Error('Crashed');
    };

    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(spyLog).toHaveBeenCalled();
      const [error] = spyLog.mock.calls[0];
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Crashed');
    });
  });
});
