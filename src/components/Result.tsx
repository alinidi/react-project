import { useEffect, useState, type ChangeEvent } from 'react';
import { Header } from './Header/Header';
import { getResults } from '../API/getResults';
import { Artworks } from './Artworks/Artworks';
import s from './Results.module.scss';
import { getFriendlyErrorMessage } from '../helper/getUserFriendlyErrorMessages';
import { Error } from '../common/Error/Error';
import type {
  PaginationInfo,
  Result as ResultType,
  RootState,
} from '../types/types';
import { getPaginationInfo } from '../API/getPaginationInfo';
import { Pagination } from './Pagination/Pagination';
import { useNavigate, useParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Flyout } from '../common/Flyout/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllItems } from '../features/selectItem/selectItemSlice';
import { useGetConfigEndpointQuery } from '../services/api';

export const Result = () => {
  const [searchedText, setSearchedText] = useLocalStorage();

  const [results, setResults] = useState<ResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const { page = '1' } = useParams();
  const currentPage = Number(page);

  const navigate = useNavigate();

  const count = useSelector((state: RootState) => state.selectItem.count);
  const dispatch = useDispatch();

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
  let url = '';
  if (
    typeof window !== 'undefined' &&
    typeof URL.createObjectURL === 'function'
  ) {
    url = URL.createObjectURL(blob);
  }

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      setIsLoading(true);
      await handleLocalStorage();
      setIsLoading(false);
    };

    fetchFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  async function handleLocalStorage() {
    setIsLoading(true);
    try {
      const query = searchedText;
      const results = await getResults(query, Number(currentPage));
      setResults(results);

      const pagination = await getPaginationInfo(query, Number(currentPage));
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
      const results = await getResults(query, Number(currentPage));
      setResults(results);

      const pagination = await getPaginationInfo(query, Number(currentPage));
      setPagination(pagination);

      if (results.length === 0) {
        setError('Nothing found, try another request');
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(getFriendlyErrorMessage(error));
        setIsLoading(false);
      }
    }
  }

  async function handlePageChange(pageNumber: number) {
    navigate(`/${pageNumber}`);
  }

  function handleUnselect() {
    dispatch(removeAllItems());
  }

  const { data } = useGetConfigEndpointQuery();
  console.log(data?.config.iiif_url);

  return (
    <div
      data-testid="result"
      className={`${isLoading ? s.loading : ''} ${s.wrapper}`}
    >
      <Error error={error} />
      <Header
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        searchedText={searchedText}
      />
      <Artworks results={results} />
      {pagination !== null && !isLoading && (
        <Pagination
          current_page={pagination.current_page}
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
