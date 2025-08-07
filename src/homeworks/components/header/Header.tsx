import React, { useContext } from 'react';
import s from './header.module.sass';
import { Logo } from '../logo/Logo';
import { ThemeContext } from '../ThemeContext';
import { ThemeSwithcer } from '../themeSwitcher/ThemeSwitcher';
import { LanguageeSwithcer } from '../languageSwitcher/LanguageSwitcher';

export const Header: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
      <Logo />
      <div className={s['control-buttons']}>
        <ThemeSwithcer />
        <LanguageeSwithcer />
      </div>
    </div>
  );
};
