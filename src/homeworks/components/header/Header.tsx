import React from 'react';
import s from './header.module.sass';
import { Logo } from '../logo/Logo';

export const Header: React.FC = () => {
  return (
    <div className={s.header}>
      <Logo />
    </div>
  );
};
