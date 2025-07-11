export async function getConfigEndpoint() {
  try {
    const response = await fetch('https://api.artic.edu/api/v1/artworks');
    const parsedResponse = await response.json();
    const configUrl = parsedResponse.config.iiif_url;
    return configUrl;
  } catch (error) {
    console.log(error);
  }
}
