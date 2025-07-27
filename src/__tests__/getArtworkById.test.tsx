import { describe, it, vi, expect, type Mock } from 'vitest';
import { getConfigEndpoint } from '../API/getConfigEndpoint';
import { getArtworkById } from '../API/getArtworkById';

vi.mock('../API/getConfigEndpoint', () => ({
  getConfigEndpoint: vi.fn(),
}));

global.fetch = vi.fn();

describe('getArtworkById', () => {
  it('get artwork data', async () => {
    (getConfigEndpoint as Mock).mockResolvedValueOnce(
      'https://www.artic.edu/iiif/2'
    );

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          image_id: 'image_id',
          title: 'title',
          artist_display: 'artist_display',
          description: 'description',
          place_of_origin: 'place_of_origin',
        },
      }),
    });

    const result = await getArtworkById('12');

    expect(result).toMatchObject({
      title: 'title',
      artist_display: 'artist_display',
      description: 'description',
      place_of_origin: 'place_of_origin',
      proxiedUrl: expect.stringContaining('image_id'),
    });
  });
});
