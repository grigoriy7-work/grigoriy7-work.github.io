import React, { ReactNode, useContext } from 'react';
import { Header } from '../header/Header';
import s from './layout.module.sass';
import { ThemeContext } from '../ThemeContext';

export const Layout: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <Header />
      <div className={[s.content, s[`content--${theme.color}`]].join(' ')}>{children}</div>
    </div>
  );
};
