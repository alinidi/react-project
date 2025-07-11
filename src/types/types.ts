import type { ChangeEvent } from 'react';

export type State = {
  searchedText: string;
  results: Result[];
  isLoading: boolean;
};

export type Result = {
  id: number;
  image_id: number;
  title: string;
  artist_display: string;
  date_end: number;
  imageUrl: '';
};

export type SearchedResults = {
  results: Result[];
};

export type HeaderProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: () => void;
  searchedText: string;
};

export type InputProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchedText: string;
};

export type ButtonProps = {
  handleOnClick: () => void;
};
