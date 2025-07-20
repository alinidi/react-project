import type { ChangeEvent, ReactNode } from 'react';

export type State = {
  searchedText: string;
  results: Result[];
  isLoading: boolean;
  error: string;
};

export type Result = {
  id: number;
  image_id: number;
  title: string;
  artist_display: string;
  date_end: number;
  imageUrl: string;
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
  children: string;
};

export type ErrorProps = {
  error: string;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export type ApiResponse = {
  data: Result[];
  config: {
    iiif_url: string;
    website_url: string;
  };
};

export type ArtworkResponse = {
  data: Result;
};
