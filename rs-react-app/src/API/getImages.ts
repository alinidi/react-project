import { getConfigEndpoint } from './getConfigEndpoint';

export async function getImages(ids: number[]) {
  try {
    const configUrl = await getConfigEndpoint();
    const urls = ids.map((id) => `${configUrl}/${id}/full/400,/0/default.jpg`);
    return urls;
  } catch (error) {
    console.log(error);
  }
}
