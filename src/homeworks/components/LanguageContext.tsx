import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type TypeLanguage = 'ru' | 'en';

interface LanguareProps {
  language: TypeLanguage;
  setLanguage?: () => void;
  translater?: (text: string) => string;
}

export const LanguageContext = React.createContext<LanguareProps>({ language: 'ru' });

export const LanguageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<TypeLanguage>('ru');
  const toogleLanguage = () => {
    setLanguage((prev: string) => {
      const curentLanguage = prev === 'ru' ? 'en' : 'ru';
      i18n.changeLanguage(curentLanguage);
      return curentLanguage;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      {children}
    </LanguageContext.Provider>
  );
};
