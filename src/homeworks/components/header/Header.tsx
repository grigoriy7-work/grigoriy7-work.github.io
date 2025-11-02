import React, { useContext, useEffect } from 'react';
import s from './header.module.sass';
import { Logo } from '../logo/Logo';
import { ThemeContext } from '../ThemeContext';
import { ThemeSwithcer } from '../themeSwitcher/ThemeSwitcher';
import { LanguageeSwithcer } from '../languageSwitcher/LanguageSwitcher';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut } from '../logOut';
import { ProfileButton } from '../profileButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/redux/store';
import { LoginButton } from '../loginButton';

export const Header: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div className={[s.header, s[`header--${theme.color}`]].join(' ')}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <div className={s['nav-links']}>
        <NavLink className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`} to="/login">
          {t('header.login')}
        </NavLink>
        <NavLink
          className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`}
          to="/registration"
        >
          {'Регистрация 2'}
        </NavLink>
        <NavLink className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`} to="/auth">
          {t('header.registration')}
        </NavLink>
        <NavLink
          className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`}
          to="/profile"
        >
          {t('header.profile')}
        </NavLink>
        <NavLink
          className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`}
          to="/operations"
        >
          {t('header.operations')}
        </NavLink>
        <NavLink
          className={({ isActive }) => `${s['nav-link']} ${isActive ? s['nav-link--active'] : ''}`}
          to="/add-operation"
        >
          {t('header.add-operation')}
        </NavLink>
      </div>
      <div className={s['control-buttons']}>
        {token !== '' ? (
          <>
            <ProfileButton />
            <LogOut />
          </>
        ) : (
          <LoginButton />
        )}
        <ThemeSwithcer />
        <LanguageeSwithcer />
      </div>
    </div>
  );
};
