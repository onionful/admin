import { isEmpty, set, uniq } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { User } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';
import actions from './actions';

const { fetchUsersListAction, fetchLabelsAction } = actions;

export interface UsersState {
  data: {
    users: User[];
    total: number;
    limit: number;
  };
  labels: any;
}

const initialState: UsersState = {
  data: {
    users: [],
    total: 0,
    limit: 50,
  },
  labels: {},
};

interface UsersResponse<T> {
  length: number;
  limit: number;
  start: number;
  total: number;
  users: T[];
}

// Effects
export const fetchUsersList = (params: any) => (dispatch: Dispatch) => {
  dispatch(fetchUsersListAction.request());

  api
    .get<UsersResponse<User>>('/users', { params })
    .then(response => dispatch(fetchUsersListAction.success(response.data.users)))
    .catch(error => dispatch(fetchUsersListAction.failure(error)));
};

export const fetchLabels = (...args: string[]) => (dispatch: Dispatch) => {
  const ids = uniq(([] as string[]).concat(...args)).filter(v => v);
  dispatch(fetchLabelsAction.request());

  if (isEmpty(ids)) {
    dispatch(fetchLabelsAction.success([]));
  } else {
    api
      .get<UsersResponse<User>>(`/users/labels/${ids.join()}`)
      .then(response => dispatch(fetchLabelsAction.success(response.data.users)))
      .catch(error => dispatch(fetchLabelsAction.failure(error)));
  }
  // meta: { distinctLoading: ids },
};

export const findUsers = (query: string) =>
  api.get<UsersResponse<User>>(`/users/find/${query}`).then(response => response.data.users);

// Selectors
export const getUserLabel = (state: ApplicationState, id: string) => state.users.labels[id];

// export default typeToReducer<UsersState>(
//   {
//     [UsersActionTypes.USERS_LIST]: {
//       FULFILLED: (state, { payload: { data } }) => set(state, 'data', data),
//     },
//     [UsersActionTypes.USERS_LABELS]: {
//       FULFILLED: (state, { payload }) => ({
//         ...state,
//         labels: merge(state.labels, keyBy(payload, 'user_id')),
//       }),
//     },
//   },
//   initialState,
// );

// Reducer
export default createReducer(initialState)
  .handleAction(fetchUsersListAction.success, state => state)
  .handleAction(fetchLabelsAction.success, (state, action) =>
    action.payload.reduce((acc, user) => set(state, ['labels', user.user_id], user), state),
  );
