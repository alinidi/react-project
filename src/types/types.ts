import type { ChangeEvent, ReactNode } from 'react';
import type { store } from '../app/store';

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
  description: string;
  place_of_origin: string;
};

export type SearchedResults = {
  results: Result[];
};

export type HeaderProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: () => void;
  searchedText: string;
};

export type MenuProps = HeaderProps & {
  toggleMenu: () => void;
};

export type InputProps = {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchedText: string;
};

export type ButtonProps = {
  handleOnClick?: () => void;
  children: string | ReactNode;
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
  total_pages: number;
};

export type ArtworkResponse = {
  data: Result;
};

export type PaginationInfo = {
  current_page: number;
  total_pages: number;
  limit?: number;
  next_url?: string;
  total?: number;
};

export type PaginationProps = PaginationInfo & {
  handlePageChange: (page: number) => void;
};

export type Data = {
  title: string;
  artist_display: string;
  description: string;
  proxiedUrl: string;
  place_of_origin: string;
};

export type CheckboxType = {
  handleCheckboxChange: (item: Result) => void;
  result: Result;
  isChecked: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
