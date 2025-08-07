import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { LanguageContext } from '../LanguageContext';

export const ThemeSwithcer: React.FC = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const color = theme.color;

  return (
    <button onClick={theme.setTheme}>
      {language.translater('theme')} {language.translater(color)}
    </button>
  );
};
