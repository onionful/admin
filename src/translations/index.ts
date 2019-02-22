import config from 'config';
import flat from 'flat';
import { renderToStaticMarkup } from 'react-dom/server';
import { InitializePayload, NamedLanguage } from 'react-localize-redux';
import en from './en.json';
import pl from './pl.json';

const { defaultLanguage } = config;

export interface Language extends NamedLanguage {
  data: any;
}

interface Translations extends InitializePayload {
  languages: Array<Language>;
}

export default <Translations>{
  languages: [
    { name: 'English', code: 'en', data: flat(en) },
    { name: 'Polish', code: 'pl', data: flat(pl) },
  ],
  options: { renderToStaticMarkup, defaultLanguage },
};
