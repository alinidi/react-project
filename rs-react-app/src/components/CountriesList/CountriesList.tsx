/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useMemo } from 'react';
import type { CountryInfo } from '../../types/types';
import s from './CountriesList.module.scss';

const CountriesListComponent = ({ countries }: Record<string, CountryInfo>) => {
  if (!countries) return null;

  const data = useMemo(() => Object.entries(countries), [countries]);

  return (
    <div className={s.wrapper}>
      {data.map((d, i) => (
        <div key={i} className={s.countryWrapper}>
          <div className={s.column}>
            <p className={s.header}>Country</p>
            <div>{d[0]}</div>
          </div>
          <div className={s.column}>
            <p className={s.header}>ISO</p>
            <div>{d[1].data[1].iso_code ?? 'N/A'}</div>
          </div>
          <div className={s.column}>
            <p className={s.header}>Population</p>
            <div>{d[1].data.at(-1)?.population ?? 'N/A'}</div>
          </div>
          <div className={s.column}>
            <p className={s.header}>CO2</p>
            <div>{d[1].data.at(-1)?.cement_co2_per_capita ?? 'N/A'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CountriesList = memo(CountriesListComponent);
