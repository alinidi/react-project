import { describe, it, expect, vi, type Mock } from 'vitest';
import { attachImageUrlsToResults } from '../helper/attachImageUrlsToResults';
import { getImages } from '../API/getImages';
import type { Result } from '../types/types';

vi.mock('../API/getImages', () => ({
  getImages: vi.fn(),
}));

describe('attachImageUrlsToResults', () => {
  it('returns results with attached image URLs', async () => {
    const mockResponses: { data: Result }[] = [
      {
        data: {
          id: 1,
          title: 'Art',
          image_id: 123,
          artist_display: 'Artist One',
          date_end: 1900,
          imageUrl: '',
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
        },
      },
    ];

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
      },
      {
        id: 2,
        title: 'More Art',
        image_id: 456,
        artist_display: 'Artist Two',
        date_end: 1950,
        imageUrl: 'url-456.jpg',
      },
    ]);
  });
});
