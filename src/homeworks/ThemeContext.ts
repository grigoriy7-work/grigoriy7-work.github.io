import React from 'react';

interface Theme {
  color: string;
  setTheme?: () => void;
}

export const ThemeContext = React.createContext<Theme>({ color: 'light' });
