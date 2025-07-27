import s from './Error.module.scss';
import type { ErrorProps } from '../../types/types';

export const Error = (props: ErrorProps) => {
  return (
    <div className={s.errorWrapper}>
      <p>{props.error}</p>
    </div>
  );
};
