import { getImages } from '../API/getImages';
import type { Result } from '../types/types';

export async function attachImageUrlsToResults(responses: { data: Result }[]) {
  const datas = responses.map((resp) => resp.data);
  const ids = datas.map((item: Result) => item.image_id);
  const urls = await getImages(ids);

  if (!urls) {
    return [];
  }

  const results = datas.map((item: Result, index: number) => ({
    ...item,
    imageUrl: urls[index],
  }));

  return results;
}
