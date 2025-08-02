import s from './Artworks.module.scss';
import type { Result, RootState, SearchedResults } from '../../types/types';
import { Link, useParams } from 'react-router';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../features/selectItem/selectItemSlice';

export const Artworks = (props: SearchedResults) => {
  const { page = '1' } = useParams();
  const dispatch = useDispatch();
  const results = useSelector((state: RootState) => state.selectItem.results);

  function handleCheckboxChange(item: Result) {
    if (!results.find((result) => result.id === item.id)) {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item));
    }
  }

  return (
    <div data-testid="artworks" className={s.artworksWrapper}>
      {props.results.map((result) => {
        const isChecked =
          results.find((item) => item.id === result.id) !== undefined;

        return (
          <div key={result.id}>
            <Link to={`/${page}/${result.id}`} className={s.art}>
              <img src={result.imageUrl} alt={result.title} />
              <div className={s.description}>
                <div>
                  <h2 className={s.title}>
                    {result.title}, {result.date_end}
                  </h2>
                  <p className={s.artist}>{result.artist_display}</p>
                </div>
              </div>
            </Link>
            <Checkbox
              handleCheckboxChange={handleCheckboxChange}
              result={result}
              isChecked={isChecked}
            />
          </div>
        );
      })}
    </div>
  );
};
