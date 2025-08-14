import { DetailView } from 'components/DetailView/DetailView';
import { MainLayout } from 'components/MainLayout/MainLayout';

type PageProps = {
  params: {
    page: string;
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <MainLayout page={params.page} detailsId={params.id}>
      <DetailView detailsId={params.id}></DetailView>
    </MainLayout>
  );
}
