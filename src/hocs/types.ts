import { ErrorInfo } from 'react';
import { TranslateFunction } from 'react-localize-redux';

export interface WithErrorHandlerProps {
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface WithLoadingProps {
  isLoading: boolean;
}

export interface WithTranslateProps {
  _: TranslateFunction;
}
