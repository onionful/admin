import { ApplicationState } from 'reducers';
import { Collection } from 'types';
import { api } from 'utils';
import { CollectionsActionTypes } from './types';

export const fetchCollection = (id: string) => ({
  type: CollectionsActionTypes.COLLECTIONS_GET,
  payload: api.get(`/collections/${id}`),
});

export const fetchCollections = (params?: any) => ({
  type: CollectionsActionTypes.COLLECTIONS_LIST,
  payload: api.get('/collections', params),
});

export const createCollection = (data: any) => ({
  type: CollectionsActionTypes.COLLECTIONS_CREATE,
  payload: api.post('/collections', data),
});

export const updateCollection = (id: string, data: any) => ({
  type: CollectionsActionTypes.COLLECTIONS_UPDATE,
  payload: api.put(`/collections/${id}`, data),
});

export const deleteCollection = (id: string) => ({
  type: CollectionsActionTypes.COLLECTIONS_DELETE,
  payload: api.delete(`/collections/${id}`),
});

export const getCollections = (state: ApplicationState) => state.collections.data;

export const getCollection = (state: ApplicationState, id: string) =>
  state.collections.data[id] ||
  ({
    id: undefined,
    name: undefined,
    fields: [{ id: 'id', name: 'ID', type: 'identifier', fieldRef: null }],
  } as Collection);
