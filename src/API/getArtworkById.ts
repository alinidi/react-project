import { getConfigEndpoint } from './getConfigEndpoint';

export async function getArtworkById(id: string) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    if (!response.ok) {
      throw new Error();
    }
    const json = await response.json();
    const data = json.data;
    const image_id = data.image_id;

    if (!data || !id) {
      throw new Error('Invalid data or ID');
    }

    const configUrl =
      (await getConfigEndpoint()) || 'https://www.artic.edu/iiif/2';
    const rawUrl = `${configUrl}/${image_id}/full/400,/0/default.jpg`;
    const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
      rawUrl.replace(/^https?:\/\//, '')
    )}`;

    return {
      title: data.title,
      artist_display: data.artist_display,
      description: data.description,
      place_of_origin: data.place_of_origin,
      proxiedUrl,
    };
  } catch (error) {
    throw new Error(`Failed to load artwork: ${error}`);
  }
}
