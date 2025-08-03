import { createContext } from 'react';

const DEFAULT_THEME = 'light';

type InitialState = {
  theme: Theme;
  toggleTheme: () => void;
};

type Theme = 'light' | 'dark';

const InitialState = {
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(InitialState);
