import { getArtworkById } from 'API/getArtworkById';
import { DetailView } from 'components/DetailView/DetailView';
import { MainLayout } from 'components/MainLayout/MainLayout';
import { notFound } from 'next/navigation';
import { Data } from 'types/types';

type PageParams = {
  page: string;
  detailsId: string;
};

async function fetchPopularArtworkIds(): Promise<string[]> {
  try {
    const response = await fetch(
      'https://api.artic.edu/api/v1/artworks?limit=50&fields=id&page=1'
    );
    const data = await response.json();
    return data.data.map((item: { id: number }) => item.id.toString());
  } catch (err) {
    console.error('Failed to fetch popular artworks:', err);
    return [];
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function generateStaticParams() {
  const popularIds = await fetchPopularArtworkIds();

  return popularIds.map((detailsId) => ({
    page: '1',
    detailsId,
  }));
}

export const revalidate = 86400;

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { page, detailsId } = await params;

  try {
    const details: Data = await getArtworkById(detailsId);

    return (
      <MainLayout page={page}>
        <DetailView details={details} page={page} />
      </MainLayout>
    );
  } catch {
    notFound();
  }
}
