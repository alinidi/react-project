import { useEffect, useState } from 'react';
import { List } from '../components/List/List';
import { getCountriesInfo } from '../API/getCountriesInfo';
import type { CountryInfo } from '../types/types';

export const MainPage = () => {
  const [countries, setCountries] = useState<Record<string, CountryInfo>>();

  useEffect(() => {
    async function getData() {
      const data = await getCountriesInfo();
      setCountries(data);
    }

    getData();
  }, []);

  return (
    <div>
      <List countries={countries} />
    </div>
  );
};
