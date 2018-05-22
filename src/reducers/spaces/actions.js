import { api } from 'utils';
import * as types from './types';

export const fetchSpaces = params => ({
  type: types.SPACES_LIST,
  payload: api.get('/spaces', { params }),
});
