import React, { useState, useRef, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Alert } from '../homeworks/components/alert/Alert';
import { ThemeContext, TypeColor } from 'src/homeworks/components/ThemeContext';
import { LanguageContext, TypeLanguage } from 'src/homeworks/components/LanguageContext';
import { Layout } from 'src/homeworks/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { List } from 'src/homeworks/components/list/List';

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

  const operations = [
    {
      sum: 5000,
      category: 'расходы',
      name: 'покупка товаров',
      description:
        'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
    },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
        <Layout>
          <Alert />
          <List operations={operations} />
        </Layout>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
