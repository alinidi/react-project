export async function getResults(searchText: string) {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${searchText}`
    );
    if (!response.ok) {
      throw new Error('Failed fetching results');
    }
    const results = await response.json();
    const data = results.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
