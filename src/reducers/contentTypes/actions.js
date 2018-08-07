import { Map } from 'immutable';
import { spaceApi } from 'utils';
import * as types from './types';

export const fetchContentType = id =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_ITEM,
    payload: api.get(`/content-types/${id}`),
  }));

export const fetchContentTypes = params =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_LIST,
    payload: api.get('/content-types', params),
  }));

export const createContentType = data =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_CREATE,
    payload: api.post('/content-types', data),
  }));

export const updateContentType = (id, data) =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_CREATE,
    payload: api.put(`/content-types/${id}`, data),
  }));

export const getContentTypes = state => state.getIn(['contentTypes', 'data']);

export const getContentType = (state, id) =>
  state.getIn(['contentTypes', 'data']).find(item => item.get('id') === id) || Map();
