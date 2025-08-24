import { useSelector } from 'react-redux';
import s from './CountriesInput.module.scss';
import type { RootState } from '../../app/store';
import React, { useState, type InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

type InputType = {
  id?: string;
  type: string;
  name?: string;
  htmlFor?: string;
  placeholder?: string;
  children?: string;
  value?: string; //из react-hook-form
  onChange?: (value: string) => void;
  errorMessage?: string | FieldError | undefined;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export const CountriesInput = ({
  id,
  type,
  name,
  htmlFor,
  placeholder,
  children,
  value,
  onChange,
  errorMessage,
}: InputType) => {
  const countries = useSelector((state: RootState) => state.countries);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isHide, setIsHide] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.currentTarget.value;

    if (onChange) {
      onChange(inputText);
    }

    if (!inputText.trim()) {
      setSuggestions([]);
      setIsHide(true);
    } else {
      setIsHide(false);
      setSuggestions(
        countries.filter((c) =>
          c.toLowerCase().startsWith(inputText.toLowerCase())
        )
      );
    }
  };

  const hideSuggestions = (val: string) => {
    setIsHide(true);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className={s.inputWrapper}>
      <div className={s.labelInput}>
        <label htmlFor={htmlFor}>{children}</label>
        <div className={s.inputAndError}>
          <input
            onChange={handleChange}
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value || ''} //значение из RHF
          />
          {errorMessage && <p className={s.error}>{errorMessage as string}</p>}
        </div>
      </div>
      <div className={isHide ? s.hide : s.shown}>
        {suggestions.map((sug, index) => (
          <div key={index} onClick={() => hideSuggestions(sug)}>
            {sug}
          </div>
        ))}
      </div>
    </div>
  );
};
