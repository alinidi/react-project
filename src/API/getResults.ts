import { attachImageUrlsToResults } from '../helper/attachImageUrlsToResults';
import type { Result } from '../types/types';

export async function getResults(searchText: string) {
  try {
    if (searchText !== '') {
      //receive ids
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${searchText}`
      );
      if (!response.ok) {
        throw new Error(`Failed fetching data. Status: ${response.status}`);
      }
      const results = await response.json();
      const data = results.data;
      const ids = data.map((item: Result) => item.id);

      //receive whole info
      const promises = ids.map((id: number) =>
        fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
      );

      const info = await Promise.all(promises);
      info.forEach((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed fetching artwork info. Status: ${response.status}`
          );
        }
      });

      const infoResponses = await Promise.all(info.map((i) => i.json()));

      return await attachImageUrlsToResults(infoResponses);
    } else {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks`);
      if (!response.ok) {
        throw new Error('Failed fetching results');
      }

      const result = await response.json();
      const responses = result.data.map((item: Result) => ({ data: item }));

      return await attachImageUrlsToResults(responses);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
