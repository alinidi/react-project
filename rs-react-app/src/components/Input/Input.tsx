import type { InputHTMLAttributes } from 'react';
import s from './Input.module.scss';
import type { FieldError } from 'react-hook-form';

type InputType = {
  id?: string;
  type: string;
  name?: string;
  htmlFor?: string;
  placeholder?: string;
  children?: string;
  value?: string;
  errorMessage?: string | FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  type,
  name,
  htmlFor,
  placeholder,
  children,
  value,
  errorMessage,
  ...rest
}: InputType) => {
  return (
    <div className={s.inputWrapper}>
      <label htmlFor={htmlFor}>{children}</label>
      <div className={s.inputAndError}>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {errorMessage && <p className={s.error}>{errorMessage as string}</p>}
      </div>
    </div>
  );
};
