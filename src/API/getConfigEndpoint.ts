export async function getConfigEndpoint() {
  try {
    const response = await fetch('https://api.artic.edu/api/v1/artworks');

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const parsedResponse = await response.json();
    const configUrl = parsedResponse.config.iiif_url;
    return configUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error');
  }
}
