'use client';

import s from './DetailView.module.scss';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Data } from 'types/types';

type DetailViewProps = {
  details: Data;
  page?: string;
};

export const DetailView = ({ details, page = '1' }: DetailViewProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.push(`/${page}`);
  };

  return (
    <div className={s.container} data-testid={'detailView'}>
      <X
        size={35}
        className={s.close}
        onClick={handleClose}
        data-testid="close-btn"
      />
      <div className={s.wrapper}>
        <img src={details.proxiedUrl} alt="image" />
        <p className={s.title}>{details.title}</p>
        <p className={s.country}>{details.place_of_origin}</p>
        <p className={s.artist}>{details.artist_display}</p>
        <p className={s.description}>
          {details.description?.replace(/<[^>]*>/g, '')}
        </p>
      </div>
    </div>
  );
};
