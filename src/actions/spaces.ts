import { Dispatch } from 'redux';
import { Space } from 'types';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { api } from 'utils';

const createSpaceAction = createAsyncAction(
  'SPACES_CREATE_PENDING',
  'SPACES_CREATE_FULFILLED',
  'SPACES_CREATE_REJECTED',
)<Space, Space, any>();

const deleteSpaceAction = createAsyncAction(
  'SPACES_DELETE_PENDING',
  'SPACES_DELETE_FULFILLED',
  'SPACES_DELETE_REJECTED',
)<string, Space, any>();

const getSpaceAction = createAsyncAction(
  'SPACES_ITEM_PENDING',
  'SPACES_ITEM_FULFILLED',
  'SPACES_ITEM_REJECTED',
)<string, Space, any>();

const listSpacesAction = createAsyncAction(
  'SPACES_LIST_PENDING',
  'SPACES_LIST_FULFILLED',
  'SPACES_LIST_REJECTED',
)<undefined, Space[], any>();

const updateSpaceAction = createAsyncAction(
  'SPACES_UPDATE_PENDING',
  'SPACES_UPDATE_FULFILLED',
  'SPACES_UPDATE_REJECTED',
)<{ id: string; data: Space }, { id: string; data: Space }, any>();

const setSpaceAction = createStandardAction('SPACES_SET')<Space>();

// Effects
// TODO do not return <any>
export const createSpace = (data: Space) => (dispatch: Dispatch): Promise<Space> => {
  dispatch(createSpaceAction.request(data));

  return api
    .post<Space>('/spaces', data)
    .then(response => {
      dispatch(createSpaceAction.success(response.data));
      return response.data;
    })
    .catch(error => {
      dispatch(createSpaceAction.failure(error));
      return error;
    });
};

export const deleteSpace = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteSpaceAction.request(id));

  api
    .delete(`/spaces/${id}`)
    .then(response => dispatch(deleteSpaceAction.success(response.data)))
    .catch(error => dispatch(deleteSpaceAction.failure(error)));
};

export const fetchSpace = (id: string) => (dispatch: Dispatch) => {
  dispatch(getSpaceAction.request(id));

  api
    .get(`/spaces/${id}`)
    .then(response => dispatch(getSpaceAction.success(response.data)))
    .catch(error => dispatch(getSpaceAction.failure(error)));
};

export const fetchSpacesList = () => (dispatch: Dispatch) => {
  dispatch(listSpacesAction.request());

  api
    .get('/spaces')
    .then(response => dispatch(listSpacesAction.success(response.data)))
    .catch(error => dispatch(listSpacesAction.failure(error)));
};

// TODO meta: { id } ??
export const updateSpace = (id: string, data: Space) => (dispatch: Dispatch): Promise<any> => {
  dispatch(updateSpaceAction.request({ id, data }));

  return api
    .put(`/spaces/${id}`, data)
    .then(response => dispatch(updateSpaceAction.success({ id, data: response.data })))
    .catch(error => dispatch(updateSpaceAction.failure(error)));
};

export const setSpace = (space: Space) => {
  // localStorage.setItem('space', space);
  return setSpaceAction(space);
};

export default {
  create: createSpaceAction,
  delete: deleteSpaceAction,
  get: getSpaceAction,
  list: listSpacesAction,
  update: updateSpaceAction,
  set: setSpaceAction,
};
