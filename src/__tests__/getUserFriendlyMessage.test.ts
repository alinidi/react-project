import { it } from 'vitest';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';

describe('get user Friendly error message', () => {
  it('returns correct message for HTTP error', () => {
    const error = new Error('HTTP error 500');
    const result = getFriendlyErrorMessage(error);
    expect(result).toBe('Please try again later!');
  });

  it('returns correct message for Failed fetching', () => {
    const error = new Error('Failed fetching');
    const result = getFriendlyErrorMessage(error);
    expect(result).toBe('Failed to load results. Please try again later!');
  });

  it('returns inknown error message', () => {
    const error = new Error('Something went wrong');
    const result = getFriendlyErrorMessage(error);
    expect(result).toBe('Unknown error, please try again later');
  });
});
