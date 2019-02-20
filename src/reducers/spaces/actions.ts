import { ApplicationState } from 'reducers';
import { Space } from 'types';
import { api } from 'utils';
import { SpacesActionTypes } from './types';

export const createSpace = (data: Space) => ({
  type: SpacesActionTypes.SPACES_CREATE,
  payload: api.post('/spaces', data),
});

export const deleteSpace = (id: string) => ({
  type: SpacesActionTypes.SPACES_DELETE,
  payload: api.delete(`/spaces/${id}`),
});

export const fetchSpace = (id: string) => ({
  type: SpacesActionTypes.SPACES_ITEM,
  payload: api.get(`/spaces/${id}`),
});

export const fetchSpaces = () => ({
  type: SpacesActionTypes.SPACES_LIST,
  payload: api.get('/spaces'),
});

export const updateSpace = (id: string, data: Space) => ({
  type: SpacesActionTypes.SPACES_UPDATE,
  payload: api.put(`/spaces/${id}`, data),
  meta: { id },
});

export const setSpace = (space: string) => {
  localStorage.setItem('space', space);

  return {
    type: SpacesActionTypes.SET_SPACE,
    payload: space,
  };
};

export const getSpace = (state: ApplicationState, id: string) => state.spaces.data[id];

export const getSpaces = (state: ApplicationState) => state.spaces.data;

export const getCurrentSpace = (state: ApplicationState) =>
  state.spaces.current && state.spaces.data[state.spaces.current];
