import { createStandardAction } from 'typesafe-actions';

const loadingStartAction = createStandardAction('LOADING_START')<string[] | string>();

const loadingStopAction = createStandardAction('LOADING_STOP')<string[] | string>();

export default {
  loadingStartAction,
  loadingStopAction,
};
