import React from 'react';
import logo from './../images/logo.png';
import s from './logo.module.sass';

export const Logo: React.FC = () => {
  return (
    <div className={s.logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};
