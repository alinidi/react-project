import type { CountryInfo } from '../../types/types';
import s from './List.module.scss';

export const List = ({ countries }: Record<string, CountryInfo>) => {
  if (!countries) return;

  const data = Object.entries(countries);
  console.log(data);

  return (
    <div className={s.wrapper}>
      {data.map((d, i) => (
        <div key={i} className={s.countryWrapper}>
          <div className={s.column}>
            <p>Country</p>
            <div>{d[0]}</div>
          </div>
          <div className={s.column}>
            <p>ISO</p>
            <div>{d[1].data[1].iso_code ?? 'N/A'}</div>
          </div>
          <div className={s.column}>
            <p>Population</p>
            <div>{d[1].data.at(-1)?.population ?? 'N/A'}</div>
          </div>
          <div className={s.column}>
            <p>CO2</p>
            <div>{d[1].data.at(-1)?.cement_co2_per_capita ?? 'N/A'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
