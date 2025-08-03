import { describe, it, vi } from 'vitest';
import { getPaginationInfo } from '../API/getPaginationInfo';

const expectedWithText = {
  current_page: 1,
  limit: 12,
  offset: 0,
  total: 129359,
  total_pages: 10780,
};

const expectedWithEmptyInput = {
  current_page: 1,
  limit: 12,
  offset: 0,
  total: 42954,
  total_pages: 3580,
};

describe('getPaginationInfo', () => {
  it('get results if input is not empty', async () => {
    vi.stubGlobal('fetch', () => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ pagination: expectedWithText });
        },
      });
    });

    const results = await getPaginationInfo('art');
    expect(results).toEqual(expectedWithText);
  });
  it('get results if input is empty', async () => {
    vi.stubGlobal('fetch', () => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ pagination: expectedWithEmptyInput });
        },
      });
    });

    const results = await getPaginationInfo('');
    expect(results).toEqual(expectedWithEmptyInput);
  });
  it('response not ok', async () => {
    vi.stubGlobal('fetch', () => {
      return Promise.resolve({
        ok: false,
      });
    });

    await expect(getPaginationInfo('')).rejects.toThrow();
  });
});
