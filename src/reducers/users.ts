import usersActions from 'actions/users';
import loadingActions from 'actions/loading';
import { isEmpty, uniq } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { User } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';

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
  dispatch(usersActions.fetchUsersListAction.request());

  api
    .get<UsersResponse<User>>('/users', { params })
    .then(response => dispatch(usersActions.fetchUsersListAction.success(response.data.users)))
    .catch(error => dispatch(usersActions.fetchUsersListAction.failure(error)));
};

export const fetchLabels = (...args: string[]) => (dispatch: Dispatch) => {
  const ids = uniq(([] as string[]).concat(...args)).filter(v => v);
  dispatch(usersActions.fetchLabelsAction.request(ids));
  ids.forEach(id => dispatch(loadingActions.loadingStartAction(['fetchLabel', id])));

  if (isEmpty(ids)) {
    dispatch(usersActions.fetchLabelsAction.success([]));
  } else {
    api
      .get<UsersResponse<User>>(`/users/labels/${ids.join()}`)
      .then(response => dispatch(usersActions.fetchLabelsAction.success(response.data.users)))
      .catch(error => dispatch(usersActions.fetchLabelsAction.failure(error)));
  }
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
export default createReducer(initialState).handleAction(
  usersActions.fetchUsersListAction.success,
  state => state,
);
// .handleAction(usersActions.fetchLabelsAction.success, (state, action) =>
//   action.payload.reduce((acc, user) => set(state, ['labels', user.user_id], user), state),
// );
