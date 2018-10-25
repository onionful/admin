import { Map } from 'immutable';
import { spaceApi } from 'utils';
import * as types from './types';

export const fetchCollection = id =>
  spaceApi(api => ({
    type: types.COLLECTION_ITEM,
    payload: api.get(`/collections/${id}`),
  }));

export const fetchCollections = params =>
  spaceApi(api => ({
    type: types.COLLECTION_LIST,
    payload: api.get('/collections', params),
  }));

export const createCollection = data =>
  spaceApi(api => ({
    type: types.COLLECTION_CREATE,
    payload: api.post('/collections', data),
  }));

export const updateCollection = (id, data) =>
  spaceApi(api => ({
    type: types.COLLECTION_CREATE,
    payload: api.put(`/collections/${id}`, data),
  }));

export const getCollections = state => state.getIn(['collections', 'data']);

export const getCollection = (state, id) =>
  state.getIn(['collections', 'data']).find(item => item.get('id') === id) || Map();
