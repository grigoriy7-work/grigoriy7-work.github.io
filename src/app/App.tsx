import React, { useState, useMemo } from 'react';
import './App.css';
import { Alert } from '../homeworks/components/alert/Alert';
import { ThemeContext, TypeColor } from '../homeworks/components/ThemeContext';
import { LanguageContext, TypeLanguage } from '../homeworks/components/LanguageContext';
import { Layout } from '../homeworks/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { List } from '../homeworks/components/list/List';
import { OperationType } from '../homeworks/ts1/3_write';
import { render } from '../homeworks/components/list/renderItem';

import { FormikConfig, useFormik } from 'formik';
import { ProfileForm, ProfileFormValues } from '../features/forms/ProfileForm';
import { ProfileCompletedForm } from 'src/pages/ProfileScreen/ProfileCompletedForm/ProfileCompletedForm';
import ProfileScreen from 'src/pages/ProfileScreen';
//import { createErrorHandlers } from './utils/createErrorHandlers';

function App() {
  /*const { t, i18n } = useTranslation();
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
  ];*/

  /*const { onSubmit, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    return {
      initialValues: {
        name: 'profile?.name',
        about: 'profile?.about',
      },
      onSubmit: (values, { setErrors }) => {},
    };
  }, []);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
  });*/

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
      <button onClick={toogleLanguage}>Toogle Language</button>
      <ProfileScreen />
    </LanguageContext.Provider>

    /*<div>
      <ProfileForm formManager={formManager} />
    </div>*/

    /*<LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
        <Layout>
          <Alert />
          <List operations={operations} render={render} />
        </Layout>
      </ThemeContext.Provider>
    </LanguageContext.Provider>*/
  );
}

export default App;
