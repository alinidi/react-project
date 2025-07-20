import { it, vi, type Mock } from 'vitest';
import { getResults } from '../API/getResults';

vi.mock('../helper/attachImageUrlsToResults', () => ({
  attachImageUrlsToResults: vi.fn(),
}));

import { attachImageUrlsToResults } from '../helper/attachImageUrlsToResults';

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getResults', () => {
  it('calls correct endpoint and returns image-attached results when input is empty', async () => {
    const mockApiResponse = {
      ok: true,
      json: async () => ({
        data: [
          {
            id: 1,
            title: 'Default Artwork',
            image_id: 'defaultImg',
          },
        ],
      }),
    };

    (global.fetch as Mock).mockResolvedValueOnce(mockApiResponse);

    const mockFinalResult = [
      {
        id: 1,
        title: 'Default Artwork',
        image_id: 'defaultImg',
        imageUrl: 'some/image/url.jpg',
      },
    ];
    (attachImageUrlsToResults as Mock).mockResolvedValueOnce(mockFinalResult);

    const result = await getResults('');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.artic.edu/api/v1/artworks'
    );
    expect(attachImageUrlsToResults).toHaveBeenCalledWith([
      {
        data: {
          id: 1,
          title: 'Default Artwork',
          image_id: 'defaultImg',
        },
      },
    ]);
    expect(result).toEqual(mockFinalResult);
  });
});
