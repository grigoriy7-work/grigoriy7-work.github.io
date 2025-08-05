import React, { useContext } from 'react';
import { ThemeContext } from 'src/homeworks/ThemeContext';
import { LanguageContext } from 'src/homeworks/LanguageContext';

export const ThemeSwithcer: React.FC = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const color = theme.color;
  console.info('color', color);

  return (
    <button onClick={theme.setTheme}>
      {language.translater('theme')} {language.translater(color)}
    </button>
  );
};
