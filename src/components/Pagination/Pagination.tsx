import type { Pagination as PaginationType } from '../../types/types';
import s from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = (props: PaginationType) => {
  const pages: number[] = [];
  const pagesStep = 2;
  const start = Math.max(2, props.current_page - pagesStep);
  const end = Math.min(props.total_pages - 1, props.current_page + pagesStep);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className={s.paginationWrapper}>
      {props.current_page > 1 ? (
        <ChevronLeft
          className={s.chevron}
          size={30}
          onClick={() => props.handlePageChange?.(props.current_page - 1)}
        />
      ) : (
        <ChevronLeft size={30} color="#949494" />
      )}
      <button
        className={props.current_page === 1 ? s.active : ''}
        onClick={() => props.handlePageChange?.(1)}
      >
        1
      </button>
      {props.current_page > 3 ? <span>...</span> : ''}
      {pages.map((page) => (
        <button
          onClick={() => props.handlePageChange?.(page)}
          className={page === props.current_page ? s.active : ''}
          key={page}
        >
          {page}
        </button>
      ))}
      {end < props.total_pages - 1 ? <span>...</span> : ''}
      <button
        onClick={() => props.handlePageChange?.(props.total_pages)}
        className={props.current_page === props.total_pages ? s.active : ''}
      >
        {props.total_pages}
      </button>
      {props.current_page < props.total_pages ? (
        <ChevronRight
          className={s.chevron}
          size={30}
          onClick={() => props.handlePageChange?.(props.current_page + 1)}
        />
      ) : (
        <ChevronRight size={30} color="#949494" />
      )}
    </div>
  );
};
