export type CountryData = {
  year: number;
  population?: number | null;
  cement_co2?: number | null;
  cement_co2_per_capita?: number | null;
  cumulative_cement_co2?: number | null;
};

export type CountryInfo = {
  data: CountryData[];
  iso_code?: string | 'N/A';
};
