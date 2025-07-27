import s from './Input.module.scss';
import type { InputProps } from '../../types/types';

export const Input = (props: InputProps) => {
  return (
    <input
      className={s.input}
      type="text"
      placeholder="Search...."
      onChange={props.handleOnChange}
      value={props.searchedText}
    />
  );
};
