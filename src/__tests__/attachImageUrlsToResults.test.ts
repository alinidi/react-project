import { describe, it, expect, vi, type Mock } from 'vitest';
import { attachImageUrlsToResults } from '../helper/attachImageUrlsToResults';
import { getImages } from '../API/getImages';
import type { Result } from '../types/types';

vi.mock('../API/getImages', () => ({
  getImages: vi.fn(),
}));

describe('attachImageUrlsToResults', () => {
  const mockResponses: { data: Result }[] = [
    {
      data: {
        id: 1,
        title: 'Art',
        image_id: 123,
        artist_display: 'Artist One',
        date_end: 1900,
        imageUrl: '',
        place_of_origin: 'USA',
        description: 'Something',
      },
    },
    {
      data: {
        id: 2,
        title: 'More Art',
        image_id: 456,
        artist_display: 'Artist Two',
        date_end: 1950,
        imageUrl: '',
        place_of_origin: 'USA',
        description: 'Something',
      },
    },
  ];
  it('returns results with attached image URLs', async () => {
    const mockUrls = ['url-123.jpg', 'url-456.jpg'];
    (getImages as Mock).mockResolvedValueOnce(mockUrls);
    const result = await attachImageUrlsToResults(mockResponses);

    expect(getImages).toHaveBeenCalledWith([123, 456]);
    expect(result).toEqual([
      {
        id: 1,
        title: 'Art',
        image_id: 123,
        artist_display: 'Artist One',
        date_end: 1900,
        imageUrl: 'url-123.jpg',
        place_of_origin: 'USA',
        description: 'Something',
      },
      {
        id: 2,
        title: 'More Art',
        image_id: 456,
        artist_display: 'Artist Two',
        date_end: 1950,
        imageUrl: 'url-456.jpg',
        place_of_origin: 'USA',
        description: 'Something',
      },
    ]);
  });

  it('none urls', async () => {
    const mockResponses: { data: Result }[] = [];
    (getImages as Mock).mockResolvedValueOnce(null);
    const result = await attachImageUrlsToResults(mockResponses);

    expect(result).toEqual([]);
  });
});
