import { spaceApi } from 'utils';
import * as types from './types';

export const fetchContent = id =>
  spaceApi(api => ({
    type: types.CONTENT_ITEM,
    payload: api.get(`/content/${id}`),
  }));

export const fetchContentList = params =>
  spaceApi(api => ({
    type: types.CONTENT_LIST,
    payload: api.get('/content', params),
  }));

export const createContent = data =>
  spaceApi(api => ({
    type: types.CONTENT_CREATE,
    payload: api.post('/content', data),
  }));

export const updateContent = (id, data) =>
  spaceApi(api => ({
    type: types.CONTENT_UPDATE,
    payload: api.put(`/content/${id}`, data),
  }));

export const deleteContent = id =>
  spaceApi(api => ({
    type: types.CONTENT_DELETE,
    payload: api.delete(`/content/${id}`),
  }));

export const getContentList = state => state.getIn(['content', 'data']);

export const getContent = (state, id) => state.getIn(['content', 'data', id]);
