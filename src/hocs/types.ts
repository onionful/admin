import { Map } from 'immutable';
import { ErrorInfo } from 'react';
import {
  LocalizedElement,
  LocalizedElementMap,
  TranslateOptions,
  TranslatePlaceholderData,
  TranslateValue,
} from 'react-localize-redux';
import { NoOp } from 'types';

export interface IWithErrorHandler {
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface IWithTranslate {
  _:
    | ((
        id: TranslateValue,
        data?: TranslatePlaceholderData | Map<string, string>,
        options?: TranslateOptions,
      ) => LocalizedElement | LocalizedElementMap)
    | NoOp;
}
