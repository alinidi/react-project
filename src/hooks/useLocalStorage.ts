import { useEffect, useState } from 'react';

export function useLocalStorage(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [searchedText, setSearchedText] = useState(() => {
    return localStorage.getItem('searchedText') || '';
  });

  useEffect(() => {
    const text = localStorage.getItem('searchedText');
    setSearchedText(text ?? '');
  }, []);

  useEffect(() => {
    localStorage.setItem('searchedText', searchedText);
  }, [searchedText]);

  return [searchedText, setSearchedText];
}
