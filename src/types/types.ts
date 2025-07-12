import type { ChangeEvent, ReactNode } from 'react';

export type State = {
  searchedText: string;
  results: Result[];
  isLoading: boolean;
  error: '';
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

export type ErrorProps = {
  error: '';
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};
