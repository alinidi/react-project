import type { Pagination as PaginationType } from '../../types/types';
import s from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = (props: PaginationType) => {
  const pages: number[] = [];
  const pagesStep = 2;
  const start = Math.max(2, props.currentPage - pagesStep);
  const end = Math.min(props.totalPages - 1, props.currentPage + pagesStep);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className={s.paginationWrapper}>
      {props.currentPage > 1 ? (
        <ChevronLeft className={s.active} />
      ) : (
        <ChevronLeft />
      )}
      <button>1</button>
      {props.currentPage > 3 ? <span>...</span> : ''}
      {pages.map((page) => (
        <button key={page}>{page}</button>
      ))}
      {end < props.totalPages - 1 ? <span>...</span> : ''}
      <button>{props.totalPages}</button>
      {props.currentPage < props.totalPages ? (
        <ChevronRight className={s.active} />
      ) : (
        <ChevronRight />
      )}
    </div>
  );
};
