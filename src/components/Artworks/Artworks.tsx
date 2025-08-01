import s from './Artworks.module.scss';
import type { SearchedResults } from '../../types/types';
import { Link, useParams } from 'react-router';
import { Checkbox } from '../../common/Checkbox/Checkbox';

export const Artworks = (props: SearchedResults) => {
  const { page = '1' } = useParams();

  return (
    <div data-testid="artworks" className={s.artworksWrapper}>
      {props.results.map((result) => (
        <Link to={`/${page}/${result.id}`} key={result.id} className={s.art}>
          <img src={result.imageUrl} alt={result.title} />
          <div className={s.description}>
            <div>
              <h2 className={s.title}>
                {result.title}, {result.date_end}
              </h2>
              <p className={s.artist}>{result.artist_display}</p>
            </div>
            <Checkbox />
          </div>
        </Link>
      ))}
    </div>
  );
};
