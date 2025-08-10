import { useNavigate, useParams } from 'react-router';
import s from './DetailView.module.scss';
import { X } from 'lucide-react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  useGetArtworkByIdQuery,
  useGetConfigEndpointQuery,
} from '../../services/api';

export const DetailView = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  const { data: configUrl } = useGetConfigEndpointQuery();

  const queryArg =
    detailsId && configUrl ? { id: detailsId, configUrl } : skipToken;

  const {
    data: details,
    isLoading,
    isFetching,
    error: detailsError,
  } = useGetArtworkByIdQuery(queryArg);

  const isDataLoading = isLoading || isFetching;

  const { page = '1' } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/${page}`);
  };

  if (detailsError) {
    return <div className={s.error}>Error loading details.</div>;
  }

  return (
    <div className={s.container} data-testid={'detailView'}>
      <X
        size={35}
        className={s.close}
        onClick={handleClose}
        data-testid="close-btn"
      />
      <div className={`${s.wrapper} ${isDataLoading ? s.loading : ''}`}>
        <img src={details?.proxiedUrl} alt="image" />
        <p className={s.title}>{details?.title}</p>
        <p className={s.country}>{details?.place_of_origin}</p>
        <p className={s.artist}>{details?.artist_display}</p>
        <p className={s.description}>
          {details?.description?.replace(/<[^>]*>/g, '')}
        </p>
      </div>
    </div>
  );
};
