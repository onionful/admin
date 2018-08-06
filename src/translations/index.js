import config from 'config';
import flat from 'flat';
import { renderToStaticMarkup } from 'react-dom/server';
import en from './en.yml';
import pl from './pl.yml';

const { defaultLanguage } = config;

export default {
  languages: [
    { name: 'English', code: 'en', data: flat(en) },
    { name: 'Polish', code: 'pl', data: flat(pl) },
  ],
  options: { renderToStaticMarkup, defaultLanguage },
};
