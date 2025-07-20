import { it, vi, type Mock } from 'vitest';
import '@testing-library/jest-dom';
import { getImages } from '../API/getImages';

vi.mock('./../API/getConfigEndpoint', () => ({
  //getConfigEndpoint: vi.fn(() => 'endpoint'),
  getConfigEndpoint: vi.fn(),
}));

import { getConfigEndpoint } from '../API/getConfigEndpoint';

beforeEach(() => {
  vi.clearAllMocks();
});

const mockIds = [12, 13];

describe('getImages', () => {
  it('gets array of urls', async () => {
    (getConfigEndpoint as Mock).mockImplementation(() => 'endpoint');

    const results = await getImages(mockIds);
    const expectedResults = mockIds.map(
      (id) =>
        `https://images.weserv.nl/?url=${encodeURIComponent(`endpoint/${id}/full/400,/0/default.jpg`)}`
    );

    expect(results).toEqual(expectedResults);
  });

  it('invalid id', async () => {
    (getConfigEndpoint as Mock).mockImplementation(() => 'endpoint');

    const ids = [12, undefined as unknown as number];
    const results = await getImages(ids);

    const expectedResults = [
      'https://images.weserv.nl/?url=' +
        encodeURIComponent(`endpoint/12/full/400,/0/default.jpg`),
      'https://img.freepik.com/premium-vector/shades-gray-scale-color-palette-vector-illustration-eps-10_213497-3330.jpg?semt=ais_hybrid&w=740',
    ];

    expect(results).toEqual(expectedResults);
  });

  it('empty id array', async () => {
    const ids: number[] = [];
    const results = await getImages(ids);
    expect(results).toEqual([]);
  });

  it('if endpoint unreachable', async () => {
    (getConfigEndpoint as Mock).mockImplementation(() => {
      throw new Error('Failed');
    });

    await expect(getImages(mockIds)).rejects.toThrow('Failed');
  });

  it('returns [] if getConfigEndpoint throws non-Error value', async () => {
    (getConfigEndpoint as Mock).mockImplementation(() => {
      throw 'string';
    });

    const result = await getImages(mockIds);
    expect(result).toEqual([]);
  });
});
