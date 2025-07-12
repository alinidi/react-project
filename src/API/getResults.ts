import type { Result } from '../types/types';
import { getImages } from './getImages';

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

      const extractedData = infoResponses.map((info) => info.data);
      const extractedDataIds = extractedData.map((data) => data.image_id);

      const imageUrls = await getImages(extractedDataIds);

      if (imageUrls) {
        const finalResults = extractedData.map((item, index) => ({
          ...item,
          imageUrl: imageUrls[index],
        }));

        return finalResults;
      }
    } else {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks`);

      if (!response.ok) {
        throw new Error('Failed fetching results');
      }

      const results = await response.json();
      const data = results.data;
      const imageIds = data.map((item: Result) => item.image_id);
      const images = await getImages(imageIds);

      if (images) {
        const finalResults = data.map((item: Result, index: number) => ({
          ...item,
          imageUrl: images[index],
        }));

        return finalResults;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
