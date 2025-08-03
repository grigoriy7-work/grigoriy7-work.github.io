import React from 'react';
import { TypeColor } from 'src/homeworks/ThemeContext';

interface ThemeSwithcerProps {
  toogleThemeHandler: () => void;
  color: TypeColor;
}

export const ThemeSwithcer: React.FC<ThemeSwithcerProps> = ({ ...props }) => {
  return <button onClick={props.toogleThemeHandler}>тема {props.color}</button>;
};
