import { useParams } from 'react-router';

export const DetailView = () => {
  const { detailsId } = useParams();
  return <div>Detail View for ID: {detailsId}</div>;
};
