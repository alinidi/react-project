import type { Result } from '../types/types';

export async function getResults(searchText: string) {
  try {
    //receive ids
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${searchText}`
    );
    if (!response.ok) {
      throw new Error('Failed fetching results');
    }
    const results = await response.json();
    const data = results.data;
    const ids = data.map((item: Result) => {
      return item.id;
    });

    //receive whole info
    const promises = ids.map((id: number) => {
      return fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    });

    const info = await Promise.all(promises);
    const infoResponses = await Promise.all(info.map((i) => i.json()));

    const extractedData = infoResponses.map((info) => {
      return info.data;
    });
    return extractedData;
  } catch (error) {
    console.log(error);
  }
}
