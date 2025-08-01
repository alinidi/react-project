import s from './Artworks.module.scss';
import type { RootState, SearchedResults } from '../../types/types';
import { Link, useParams } from 'react-router';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../features/selectItem/selectItemSlice';

export const Artworks = (props: SearchedResults) => {
  const { page = '1' } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state: RootState) => state.selectItem.results);

  function handleCheckboxChange(id: number) {
    if (!results.includes(id)) {
      dispatch(addItem(id));
    } else {
      dispatch(removeItem(id));
    }
  }

  return (
    <div data-testid="artworks" className={s.artworksWrapper}>
      {props.results.map((result) => {
        const isChecked = results.includes(result.id);

        return (
          <Link to={`/${page}/${result.id}`} key={result.id} className={s.art}>
            <img src={result.imageUrl} alt={result.title} />
            <div className={s.description}>
              <div>
                <h2 className={s.title}>
                  {result.title}, {result.date_end}
                </h2>
                <p className={s.artist}>{result.artist_display}</p>
              </div>
              <Checkbox
                handleCheckboxChange={handleCheckboxChange}
                id={result.id}
                isChecked={isChecked}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
