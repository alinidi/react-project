export async function getPaginationInfo(): Promise<number> {
  const response = await fetch('https://api.artic.edu/api/v1/artworks');
  const json = await response.json();
  const pagination = json.pagination;
  return pagination.total_pages;
}
