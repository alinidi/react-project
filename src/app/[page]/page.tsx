import { MainLayout } from 'components/MainLayout/MainLayout';

type PageProps = {
  params: {
    page: string;
  };
};

export default function Page({ params }: PageProps) {
  return <MainLayout page={params.page} />;
}
