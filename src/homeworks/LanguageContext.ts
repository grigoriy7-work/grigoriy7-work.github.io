import React from 'react';

export type TypeLanguage = 'ru' | 'en';

interface LanguareProps {
  language: TypeLanguage;
  setLanguage?: () => void;
  translater?: (text: string) => string;
}

export const LanguageContext = React.createContext<LanguareProps>({ language: 'ru' });
