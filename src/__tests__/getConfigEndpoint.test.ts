import { it, vitest, type Mock } from 'vitest';
import { getConfigEndpoint } from '../API/getConfigEndpoint';
global.fetch = vitest.fn();

describe('getConfigEndpoint', () => {
  it('bad response', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getConfigEndpoint()).rejects.toThrow(
      'HTTP error. Status: 500'
    );
  });

  it('get endpoint successfully', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        config: { iiif_url: 'https://www.artic.edu/iiif/2' },
      }),
    });

    const endpoint = await getConfigEndpoint();
    expect(endpoint).toEqual('https://www.artic.edu/iiif/2');
  });

  it('throws unknown error', async () => {
    (global.fetch as Mock).mockImplementation(() => {
      throw 'Unknown Error';
    });

    await expect(getConfigEndpoint()).rejects.toThrow('Unknown error');
  });
});
