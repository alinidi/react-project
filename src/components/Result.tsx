import { useEffect, useState, type ChangeEvent } from 'react';
import { Header } from './Header/Header';
import { getResults } from '../API/getResults';
import { Artworks } from './Artworks/Artworks';
import s from './Results.module.scss';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';
import { Error } from '../common/Error/Error';
import type {
  Pagination as PaginationType,
  Result as ResultType,
} from '../types/types';
import { getPaginationInfo } from '../API/getPaginationInfo';
import { Pagination } from './Pagination/Pagination';

export const Result = () => {
  const [searchedText, setSearchedText] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      setIsLoading(true);
      await handleLocalStorage();
      setIsLoading(false);
    };

    fetchFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLocalStorage() {
    const savedText = localStorage.getItem('searchedText') || '';
    setIsLoading(true);
    try {
      const query = savedText || searchedText;
      setSearchedText(query);

      const results = await getResults(query, currentPage);
      setResults(results);

      const pagination = await getPaginationInfo(query, currentPage);
      setPagination(pagination);
    } catch (error) {
      setError(getFriendlyErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchedText(e.currentTarget.value.trim());
  }

  async function handleOnClick() {
    setIsLoading(true);
    setError('');

    try {
      const query = searchedText.trim();
      const results = await getResults(query, currentPage);
      setResults(results);

      const pagination = await getPaginationInfo(query, currentPage);
      setPagination(pagination);

      if (results.length === 0) {
        setError('Nothing found, try another request');
      }

      localStorage.setItem('searchedText', searchedText.trim());
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(getFriendlyErrorMessage(error));
        setIsLoading(false);
      }
    }
  }

  async function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
    const result = await getResults(searchedText, pageNumber);
    setResults(result);

    const pagination = await getPaginationInfo(searchedText, pageNumber);
    setPagination(pagination);
  }

  return (
    <div data-testid="result" className={isLoading ? s.loading : ''}>
      <Error error={error} />
      <Header
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        searchedText={searchedText}
      />
      <Artworks results={results} />
      {pagination !== null && (
        <Pagination
          current_page={pagination.current_page}
          total_pages={Math.min(pagination.total_pages, 80)}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
