import { api } from 'utils';
import * as types from './types';

export const fetchUsers = () => ({
  type: types.USERS_LIST,
  payload: api.get('/users'),
});
