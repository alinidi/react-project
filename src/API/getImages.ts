import { getConfigEndpoint } from './getConfigEndpoint';

export async function getImages(ids: number[]) {
  try {
    const configUrl =
      (await getConfigEndpoint()) || 'https://www.artic.edu/iiif/2';
    const urls = ids.map((id) => {
      if (id === null) {
        return 'https://img.freepik.com/premium-vector/shades-gray-scale-color-palette-vector-illustration-eps-10_213497-3330.jpg?semt=ais_hybrid&w=740';
      }
      return `${configUrl}/${id}/full/400,/0/default.jpg`;
    });
    return urls;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
