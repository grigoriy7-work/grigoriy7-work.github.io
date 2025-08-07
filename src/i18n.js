import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruCommon from './locales/ru/common.json';
import enCommon from './locales/en/common.json';

/*const resources = {
  en: {
    common: {
      theme: 'theme1',
    },
  },
  ru: {
    common: {
      theme: 'тема',
    },
  },
};*/

const resources = {
  en: {
    common: enCommon,
  },
  ru: {
    common: ruCommon,
  },
};

use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  debug: true,
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
