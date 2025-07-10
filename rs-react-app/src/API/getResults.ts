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
        throw new Error('Failed fetching results');
      }
      const results = await response.json();
      const data = results.data;
      const ids = data.map((item: Result) => item.id);

      //receive whole info
      const promises = ids.map((id: number) =>
        fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
      );

      const info = await Promise.all(promises);
      const infoResponses = await Promise.all(info.map((i) => i.json()));

      const extractedData = infoResponses.map((info) => info.data);
      const extractedDataIds = extractedData.map((data) => data.image_id);

      const imageUrls = await getImages(extractedDataIds);

      let finalResults;
      if (imageUrls) {
        finalResults = extractedData.map((data) => {
          return { ...data, imageUrl: imageUrls[data.image_id] };
        });
      }
      console.log(finalResults);

      return extractedData;
    } else {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks`);

      if (!response.ok) {
        throw new Error('Failed fetching results');
      }

      const results = await response.json();
      const data = results.data;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
