import type { CountryInfo } from '../types/types';

export async function getCountriesInfo(): Promise<
  Record<string, CountryInfo> | undefined
> {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const countriesInfo = await response.json();
    console.log(countriesInfo);
    console.log(typeof countriesInfo);
    return countriesInfo;
  } catch (err) {
    console.error(err);
  }
}
