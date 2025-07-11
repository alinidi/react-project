export async function getConfigEndpoint() {
  const response = await fetch('https://api.artic.edu/api/v1/artworks');
  const parsedResponse = await response.json();
  const configUrl = parsedResponse.config.iiif_url;
  console.log(configUrl);
  return configUrl;
}
