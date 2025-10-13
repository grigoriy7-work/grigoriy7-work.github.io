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

import * as formik from 'formik';
import { ProfileForm, ProfileFormValues } from '../features/forms/ProfileForm';
import { ProfileCompletedForm } from 'src/pages/ProfileScreen/ProfileCompletedForm/ProfileCompletedForm';
import ProfileScreen from '../pages/ProfileScreen';
import { AuthScreen } from '../pages/AuthScreen/index';
import { Routes, Route } from 'react-router-dom';
import { OperationScreen } from '../pages/OperationScreen/index';
import { HomeScreen } from '../pages/HomeScreen/index';
import { OperationAddScreen } from '../pages/OperationAddScreen';

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

  const [color, setColor] = useState<TypeColor>('light');
  const toogleTheme = () => {
    setColor((prev: string) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <LanguageContext.Provider value={{ language, setLanguage: toogleLanguage, translater: t }}>
        <ThemeContext.Provider value={{ color, setTheme: toogleTheme }}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/operations" element={<OperationScreen />} />
              <Route path="/add-operation" element={<OperationAddScreen />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Layout>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
