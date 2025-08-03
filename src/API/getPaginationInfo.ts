import type { PaginationInfo } from '../types/types';

export async function getPaginationInfo(
  searchedText: string,
  page: number = 1
): Promise<PaginationInfo> {
  try {
    if (searchedText !== '') {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${searchedText}&page=${page}&limit=12`
      );

      if (!response.ok) {
        throw new Error();
      }

      const json = await response.json();
      const pagination = json.pagination;
      console.log(pagination);
      return pagination;
    } else {
      const response = await fetch('https://api.artic.edu/api/v1/artworks');

      if (!response.ok) {
        throw new Error();
      }

      const json = await response.json();
      const pagination = json.pagination;
      return pagination;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  throw new Error('Unexpected error in getPaginationInfo');
}
