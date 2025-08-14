'use client';

import { type ChangeEvent } from 'react';
import { Header } from './Header/Header';
import { Artworks } from './Artworks/Artworks';
import s from './Results.module.scss';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';
import { Error } from '../common/Error/Error';
import type { RootState } from '../types/types';
import { Pagination } from './Pagination/Pagination';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Flyout } from '../common/Flyout/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItems } from '../features/selectItem/selectItemSlice';
import { useGetPaginationInfoQuery, useGetResultsQuery } from '../services/api';
import { useRouter } from 'next/navigation';

type ResultProps = {
  page?: string;
};

export const Result = ({ page }: ResultProps) => {
  const router = useRouter();
  const [searchedText, setSearchedText] = useLocalStorage();
  const currentPage = Number(page);

  const count = useSelector((state: RootState) => state.selectItem.count);
  const dispatch = useDispatch();

  const {
    data: results,
    isLoading: resultsIsLoading,
    isFetching,
    error: resultsError,
  } = useGetResultsQuery(
    { searchedText: searchedText, page: currentPage },
    { refetchOnMountOrArgChange: true }
  );

  const isDataLoading = resultsIsLoading || isFetching;

  const { data: pagination, isLoading: paginationIsLoading } =
    useGetPaginationInfoQuery(
      {
        searchedText: searchedText,
        page: currentPage,
      },
      { refetchOnMountOrArgChange: true }
    );

  let url = '';
  if (results) {
    const csvData = results.map((result) => {
      return [
        result.id +
          ',' +
          result.title +
          ',' +
          result.artist_display +
          ',' +
          result.imageUrl,
      ];
    });
    const csvContent = csvData.join('');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    if (
      typeof window !== 'undefined' &&
      typeof URL.createObjectURL === 'function'
    ) {
      url = URL.createObjectURL(blob);
    }
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchedText(e.currentTarget.value.trim());
  }

  async function handleOnClick() {
    setSearchedText(searchedText.trim());
  }

  async function handlePageChange(pageNumber: number) {
    router.push(`/${pageNumber}`);
  }

  function handleUnselect() {
    dispatch(removeAllItems());
  }

  return (
    <div
      data-testid="result"
      className={`${isDataLoading ? s.loading : ''} ${s.wrapper}`}
    >
      {resultsError && <Error error={getFriendlyErrorMessage(resultsError)} />}
      <Header
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        searchedText={searchedText}
      />
      <Artworks results={results ?? []} />
      {pagination !== null &&
        pagination !== undefined &&
        !paginationIsLoading && (
          <Pagination
            current_page={pagination?.current_page ?? 1}
            total_pages={Math.min(pagination.total_pages, 80)}
            handlePageChange={handlePageChange}
          />
        )}
      {count ? (
        <Flyout count={count} handleUnselect={handleUnselect} url={url} />
      ) : (
        ''
      )}
    </div>
  );
};
