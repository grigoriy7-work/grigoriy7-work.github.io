import React from 'react';

interface ThemeSwithcerProps {
  toogleThemeHandler: () => void;
}

export const ThemeSwithcer: React.FC<ThemeSwithcerProps> = ({ ...props }) => {
  return <button onClick={props.toogleThemeHandler}>тема</button>;
};
