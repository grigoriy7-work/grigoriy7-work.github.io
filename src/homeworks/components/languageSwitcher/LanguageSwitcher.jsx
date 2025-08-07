import React, { useContext } from 'react';
import { LanguageContext } from '../LanguageContext';

export const LanguageeSwithcer = () => {
  const language = useContext(LanguageContext);
  return <button onClick={language.setLanguage}>{language.language}</button>;
};
