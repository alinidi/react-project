import s from './Buttons.module.scss';
import type { ButtonProps } from '../../types/types';

export const Button = (props: ButtonProps) => {
  return (
    <button className={s.button} onClick={props.handleOnClick}>
      {props.children}
    </button>
  );
};
