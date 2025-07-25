import { useEffect, useState, type ChangeEvent } from 'react';
import { Header } from './Header/Header';
import { getResults } from '../API/getResults';
import { Artworks } from './Artworks/Artworks';
import s from './Results.module.scss';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';
import { Error } from '../common/Error/Error';
import type { Result as ResultType } from '../types/types';
import { getPaginationInfo } from '../API/getPaginationInfo';
import { Pagination } from './Pagination/Pagination';

export const Result = () => {
  const [searchedText, setSearchedText] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      setIsLoading(true);
      await handleLocalStorage();
      setIsLoading(false);
    };

    const fetchTotalPages = async () => {
      try {
        const total = await getPaginationInfo();
        setTotalPages(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFromLocalStorage();
    fetchTotalPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLocalStorage() {
    const savedText = localStorage.getItem('searchedText');
    try {
      if (savedText) {
        setSearchedText(savedText);
        const results = await getResults(savedText);
        setResults(results);
      } else {
        const results = await getResults(searchedText);
        setResults(results);
      }
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
      const results = await getResults(searchedText.trim());
      if (results.length === 0) {
        setError('Nothing found, try another request');
      }

      setResults(results);
      localStorage.setItem('searchedText', searchedText.trim());
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(getFriendlyErrorMessage(error));
        setIsLoading(false);
      }
    }
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
      {totalPages !== null && (
        <Pagination currentPage={25} totalPages={totalPages} />
      )}
    </div>
  );
};
