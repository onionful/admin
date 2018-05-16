import { api } from 'utils';
import * as types from './types';

export const fetchUsers = params => ({
  type: types.USERS_LIST,
  payload: api.get('/users', { params }),
});
