import { fromJS } from 'immutable';
import { spaceApi } from 'utils';
import * as types from './types';

export const fetchCollection = id =>
  spaceApi(api => ({
    type: types.COLLECTIONS_ITEM,
    payload: api.get(`/collections/${id}`),
  }));

export const fetchCollections = params =>
  spaceApi(api => ({
    type: types.COLLECTIONS_LIST,
    payload: api.get('/collections', params),
  }));

export const createCollection = data =>
  spaceApi(api => ({
    type: types.COLLECTIONS_CREATE,
    payload: api.post('/collections', data),
  }));

export const updateCollection = (id, data) =>
  spaceApi(api => ({
    type: types.COLLECTIONS_UPDATE,
    payload: api.put(`/collections/${id}`, data),
  }));

export const deleteCollection = id =>
  spaceApi(api => ({
    type: types.COLLECTIONS_DELETE,
    payload: api.delete(`/collections/${id}`),
  }));

export const getCollections = state => state.getIn(['collections', 'data']);

export const getCollection = (state, id) =>
  state.getIn(['collections', 'data']).find(item => item.get('id') === id) ||
  fromJS({ fields: [{ id: 'id', name: 'ID', type: 'identifier' }] });
