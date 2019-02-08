import { fromJS } from 'immutable';
import { api } from 'utils';
import * as types from './types';

export const fetchCollection = id => ({
  type: types.COLLECTIONS_ITEM,
  payload: api.get(`/collections/${id}`),
});

export const fetchCollections = params => ({
  type: types.COLLECTIONS_LIST,
  payload: api.get('/collections', params),
});

export const createCollection = data => ({
  type: types.COLLECTIONS_CREATE,
  payload: api.post('/collections', data),
});

export const updateCollection = (id, data) => ({
  type: types.COLLECTIONS_UPDATE,
  payload: api.put(`/collections/${id}`, data),
});

export const deleteCollection = id => ({
  type: types.COLLECTIONS_DELETE,
  payload: api.delete(`/collections/${id}`),
});

export const getCollections = state => state.getIn(['collections', 'data']);

export const getCollection = (state, id) =>
  state.getIn(['collections', 'data', id]) ||
  fromJS({ fields: [{ id: 'id', name: 'ID', type: 'identifier', fieldRef: null }] });
