import { Map } from 'immutable';
import { api } from 'utils';
import * as types from './types';

export const createSpace = data => ({
  type: types.SPACES_CREATE,
  payload: api.post('/spaces', data),
});

export const deleteSpace = id => ({
  type: types.SPACES_DELETE,
  payload: api.delete(`/spaces/${id}`),
});

export const fetchSpace = id => ({
  type: types.SPACES_ITEM,
  payload: api.get(`/spaces/${id}`),
});

export const fetchSpaces = () => ({
  type: types.SPACES_LIST,
  payload: api.get('/spaces'),
});

export const updateSpace = (id, data) => ({
  type: types.SPACES_UPDATE,
  payload: api.put(`/spaces/${id}`, data),
  meta: { id },
});

export const setSpace = space => {
  localStorage.setItem('space', space);

  return {
    type: types.SET_SPACE,
    payload: space,
  };
};

export const getSpace = (state, id) => state.getIn(['spaces', 'data', id]) || Map();

export const getSpaces = state => state.getIn(['spaces', 'data']);

export const getCurrentSpace = state => {
  const current = state.getIn(['spaces', 'current']);
  return state.getIn(['spaces', 'data', current]) || Map();
};
