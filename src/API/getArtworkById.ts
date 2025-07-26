export async function getArtworkById(id: string) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    if (!response.ok) {
      throw new Error();
    }
    const json = await response.json();
    const data = json.data;

    if (!data || !id) {
      throw new Error('Invalid data or ID');
    }

    const imageUrl = data.image_id
      ? `https://www.artic.edu/iiif/2/${data.image_id}/full/400,/0/default.jpg`
      : 'https://via.placeholder.com/400x400?text=No+Image';

    return {
      title: data.title,
      artist_display: data.artist_display,
      description: data.description,
      place_of_origin: data.place_of_origin,
      imageUrl,
    };
  } catch (error) {
    throw new Error(`Failed to load artwork: ${error}`);
  }
}
