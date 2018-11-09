import { api } from 'utils';
import * as types from './types';

export const fetchSpaces = params => ({
  type: types.SPACES_LIST,
  payload: api.get('/spaces', { params }),
});

export const setSpace = space => ({
  type: types.SET_SPACE,
  payload: space,
});

export const deleteSpace = id => ({
  type: types.SPACES_DELETE,
  payload: api.delete(`/spaces/${id}`),
});

export const getSpaces = state => state.getIn(['spaces', 'data']);

export const getCurrentSpace = state => state.getIn(['spaces', 'current']);
