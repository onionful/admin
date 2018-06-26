import { Map } from 'immutable';
import { spaceApi } from 'utils';
import * as types from './types';

export const fetchContentType = id =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_ITEM,
    payload: api.get(`/content-type/${id}`),
  }));

export const fetchContentTypes = params =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_LIST,
    payload: api.get('/content-type', { params }),
  }));

export const createContentType = params =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_CREATE,
    payload: api.post('/content-type', { params }),
  }));

export const updateContentType = params =>
  spaceApi(api => ({
    type: types.CONTENT_TYPE_CREATE,
    payload: api.put('/content-type', { params }),
  }));

export const getContentTypes = state => state.getIn(['contentType', 'data']);

export const getContentType = (state, id) =>
  state.getIn(['contentType', 'data']).find(item => item.get('id') === id) || Map();
