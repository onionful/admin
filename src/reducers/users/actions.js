import { isEmpty, uniq } from 'lodash';
import { api } from 'utils';
import * as types from './types';

export const fetchUsers = params => ({
  type: types.USERS_LIST,
  payload: api.get('/users', { params }),
});

export const fetchLabels = (...args) => {
  const ids = uniq([].concat(...args)).filter(v => v);
  return {
    type: types.USERS_LABELS,
    payload: isEmpty(ids)
      ? Promise.resolve([])
      : api.get(`/users/labels/${ids.join()}`).then(({ data: { users } }) => users),
    meta: { distinctLoading: ids },
  };
};

export const findUsers = query => ({
  type: types.USERS_FIND,
  payload: api.get(`/users/find/${query}`),
});

export const getUserLabel = (state, id) => state.getIn(['users', 'labels', id]);
