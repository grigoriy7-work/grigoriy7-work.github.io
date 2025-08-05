import React, { useContext } from 'react';
import { LanguageContext } from 'src/homeworks/LanguageContext';

export const LanguageeSwithcer = () => {
  const language = useContext(LanguageContext);
  return <button onClick={language.setLanguage}>{language.language}</button>;
};
