import { useEffect, useState } from 'react';

export function useLocalStorage(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('searchedText') || '';
      setSearchedText(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchedText', searchedText);
    }
  }, [searchedText]);

  return [searchedText, setSearchedText];
}
