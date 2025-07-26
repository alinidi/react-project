import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getArtworkById } from '../../API/getArtworkById';
import s from './DetailView.module.scss';
import type { Data } from '../../types/types';
import { X } from 'lucide-react';

export const DetailView = () => {
  const { detailsId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data>();
  const { page = '1' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!detailsId) return;

    async function fetchDetails() {
      setIsLoading(true);
      if (!detailsId) return;
      const data = await getArtworkById(detailsId);
      setData(data);
      setIsLoading(false);
    }

    fetchDetails();
  }, [detailsId]);

  const handleClose = () => {
    navigate(`/${page}`);
  };

  const description = data?.description;
  const cleanText = description?.replace(/<[^>]*>/g, '');

  return (
    <div className={s.container}>
      <X size={35} className={s.close} onClick={handleClose} />
      <div className={`${s.wrapper} ${isLoading ? s.loading : ''}`}>
        <img src={data?.imageUrl} alt="image" />
        <p className={s.title}>{data?.title}</p>
        <p className={s.country}>{data?.place_of_origin}</p>
        <p className={s.artist}>{data?.artist_display}</p>
        <p className={s.description}>{cleanText}</p>
      </div>
    </div>
  );
};
