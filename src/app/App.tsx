import React, { useState } from 'react';
import './App.css';
import { Alert } from '../homeworks/components/alert/Alert';
import { ThemeContext, TypeColor } from '../homeworks/components/ThemeContext';
import { LanguageContext, TypeLanguage } from '../homeworks/components/LanguageContext';
import { Layout } from '../homeworks/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { List } from '../homeworks/components/list/List';
import { OperationType } from '../homeworks/ts1/3_write';
import { render } from '../homeworks/components/list/renderItem';

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

  const operations: Array<OperationType> = [
    {
      id: '1',
      type: 'Cost',
      createdAt: Date.now().toString(),
      amount: 5000,
      category: { id: '1', name: 'Продукты' },
      name: 'покупка товаров',
      desc: 'продукт отличного качества, довольно высокого качества. Цена выше рынка. Приятно пользоваться, думаю прослужит долго.',
    },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
        <Layout>
          <Alert />
          <List operations={operations} render={render} />
        </Layout>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
