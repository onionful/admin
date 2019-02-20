import config from 'config';
import flat from 'flat';
import { renderToStaticMarkup } from 'react-dom/server';
import { InitializePayload, NamedLanguage } from 'react-localize-redux';
// @ts-ignore
import en from './en.yml';
// @ts-ignore
import pl from './pl.yml';

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
