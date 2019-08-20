import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import pl from './pl.json';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
  });

export default i18n;
