import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Alert } from '../homeworks/components/alert/Alert';
import { ThemeContext, TypeColor } from 'src/homeworks/components/ThemeContext';
import { LanguageContext, TypeLanguage } from 'src/homeworks/components/LanguageContext';
import { Layout } from 'src/homeworks/components/layout/Layout';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const [color, setColor] = useState<TypeColor>('light');
  const [language, setLanguage] = useState<TypeLanguage>('ru');

  const toogleTheme = () => {
    setColor((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toogleLanguage = () => {
    setLanguage((prev: string) => {
      const curentLanguage = prev === 'ru' ? 'en' : 'ru';
      i18n.changeLanguage(curentLanguage);
      return curentLanguage;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
        <Layout>
          <Alert />
        </Layout>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
