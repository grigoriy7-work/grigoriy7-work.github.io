import React, { useContext } from 'react';
import s from './header.module.sass';
import { Logo } from '../logo/Logo';
import { ThemeContext } from 'src/homeworks/ThemeContext';
import { ThemeSwithcer } from 'src/homeworks/components/themeSwitcher/ThemeSwitcher';

export const Header: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
      <Logo />
      <div className={s['control-buttons']}>
        <ThemeSwithcer toogleThemeHandler={theme.setTheme} color={theme.color} />
      </div>
    </div>
  );
};
