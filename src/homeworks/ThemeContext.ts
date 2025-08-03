import React from 'react';

export type TypeColor = 'light' | 'dark';

interface Theme {
  color: TypeColor;
  setTheme?: () => void;
}

export const ThemeContext = React.createContext<Theme>({ color: 'light' });
