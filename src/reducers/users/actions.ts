import { isEmpty, uniq } from 'lodash';
import { ApplicationState } from 'reducers';
import { api } from 'utils';
import { UsersActionTypes } from './types';

export const fetchUsers = (params: any) => ({
  type: UsersActionTypes.USERS_LIST,
  payload: api.get('/users', { params }),
});

export const fetchLabels = (...args: any) => {
  const ids = uniq([].concat(...args)).filter(v => v);
  return {
    type: UsersActionTypes.USERS_LABELS,
    payload: isEmpty(ids)
      ? Promise.resolve([])
      : api.get(`/users/labels/${ids.join()}`).then(({ data: { users } }) => users),
    meta: { distinctLoading: ids },
  };
};

export const findUsers = (query: string) => api.get(`/users/find/${query}`);

export const getUserLabel = (state: ApplicationState, id: string) => state.users.labels[id];
