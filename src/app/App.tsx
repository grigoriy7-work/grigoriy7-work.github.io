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
import { AuthForm } from '../features/forms/AuthForm/AuthForm';

function App() {
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
    /*<LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <button onClick={toogleLanguage}>Toogle Language</button>
      <ProfileScreen />
    </LanguageContext.Provider>*/

    <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
      <button onClick={toogleLanguage}>Toogle Language</button>
      <AuthForm />
    </LanguageContext.Provider>
  );
}

export default App;
