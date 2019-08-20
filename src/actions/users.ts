import { User } from 'types';
import { createAsyncAction } from 'typesafe-actions';

const fetchUsersListAction = createAsyncAction(
  'USERS_FETCH_PENDING',
  'USERS_FETCH_FULFILLED',
  'USERS_FETCH_REJECTED',
)<undefined, User[], any>();

const fetchLabelsAction = createAsyncAction(
  'USERS_LABELS_FETCH_PENDING',
  'USERS_LABELS_FETCH_FULFILLED',
  'USERS_LABELS_FETCH_REJECTED',
)<string[], User[], any>();

export default {
  fetchUsersListAction,
  fetchLabelsAction,
};
