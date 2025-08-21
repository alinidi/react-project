'use client';

import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import s from './ThemeProvider.module.scss';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div data-testid="themeProvider" className={s.providerWrapper}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
