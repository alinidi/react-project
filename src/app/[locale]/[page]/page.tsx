import { MainLayout } from 'components/MainLayout/MainLayout';

type PageParams = {
  page: string;
};

export default async function Page({ params }: { params: PageParams }) {
  const { page } = await params;

  return <MainLayout page={page} />;
}
