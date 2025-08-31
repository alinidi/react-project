import { Suspense } from 'react';
import { use } from 'react';
import { CountriesList } from '../components/CountriesList/CountriesList';
import { Fallback } from '../components/Fallback/Fallback';
import { countriesPromise } from '../API/getCountriesInfo';

function CountriesLoader() {
  const countries = use(countriesPromise);
  return <CountriesList countries={countries} />;
}

export const MainPage = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <h1>React Performance</h1>
      <CountriesLoader />
    </Suspense>
  );
};
