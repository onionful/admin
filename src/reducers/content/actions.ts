import { ApplicationState } from 'reducers';
import { ContentActionTypes } from 'reducers/content/types';
import { api } from 'utils';

export const fetchContent = (collection: string, id: string) => ({
  type: ContentActionTypes.CONTENT_GET,
  payload: api.get(`/content/${collection}/${id}`),
  meta: { collection, id },
});

export const fetchContentList = (collection: string, params: any) => ({
  type: ContentActionTypes.CONTENT_LIST,
  payload: api.get(`/content/${collection}`, params),
  meta: { collection },
});

export const createContent = (collection: string, data: any) => ({
  type: ContentActionTypes.CONTENT_CREATE,
  payload: api.post(`/content/${collection}`, data),
  meta: { collection },
});

export const updateContent = (collection: string, id: string, data: any) => ({
  type: ContentActionTypes.CONTENT_UPDATE,
  payload: api.put(`/content/${collection}/${id}`, data),
  meta: { collection, id },
});

export const deleteContent = (collection: string, id: string) => ({
  type: ContentActionTypes.CONTENT_DELETE,
  payload: api.delete(`/content/${collection}/${id}`),
  meta: { collection, id },
});

export const getContentList = (state: ApplicationState, collection: string) =>
  state.content[collection];

export const getContent = (state: ApplicationState, collection: string, id: string) =>
  state.content[collection][id];
