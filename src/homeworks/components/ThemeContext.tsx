import React, { createContext, useState, ReactNode } from 'react';

export type TypeColor = 'light' | 'dark';

interface Theme {
  color: TypeColor;
  setTheme?: () => void;
}

export const ThemeContext = createContext<Theme>({ color: 'light' });

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<TypeColor>('light');
  const toogleTheme = () => {
    setColor((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>{children}</ThemeContext.Provider>;
};
