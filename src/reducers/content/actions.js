import { api } from 'utils';
import * as types from './types';

export const fetchContent = params => ({
  type: types.CONTENT_LIST,
  payload: api.get('/content', { params }),
});
