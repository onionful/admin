import { api } from 'utils';
import * as types from './types';

export const fetchContent = (collection, id) => ({
  type: types.CONTENT_GET,
  payload: api.get(`/content/${collection}/${id}`),
  meta: { collection, id },
});

export const fetchContentList = (collection, params) => ({
  type: types.CONTENT_LIST,
  payload: api.get(`/content/${collection}`, params),
  meta: { collection },
});

export const createContent = (collection, data) => ({
  type: types.CONTENT_CREATE,
  payload: api.post(`/content/${collection}`, data),
});

export const updateContent = (collection, id, data) => ({
  type: types.CONTENT_UPDATE,
  payload: api.put(`/content/${collection}/${id}`, data),
});

export const deleteContent = (collection, id) => ({
  type: types.CONTENT_DELETE,
  payload: api.delete(`/content/${collection}/${id}`),
});

export const getContentList = (state, collection) => state.getIn(['content', collection]);

export const getContent = (state, collection, id) => state.getIn(['content', collection, id]);
