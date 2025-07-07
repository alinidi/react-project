import type { ChangeEvent } from 'react';

export type MainState = {
  searchedText: string;
  results: Result[];
  isLoading: boolean;
};

export type Result = {
  id: number;
  title: string;
  artist_display: string;
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
