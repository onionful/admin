import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { Collection, Content, Dictionary } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';
import actions from './actions';

const {
  fetchContentAction,
  fetchContentListAction,
  createContentAction,
  updateContentAction,
  deleteContentAction,
} = actions;

export interface ContentState {
  data: Dictionary<Dictionary<Content>>;
}

const initialState: ContentState = {
  data: {},
};

// Effects
export const fetchContent = (collection: string, id: string) => (dispatch: Dispatch) => {
  dispatch(fetchContentAction.request({ collection, id }));

  api
    .get(`/content/${collection}/${id}`)
    .then(response => dispatch(fetchContentAction.success({ collection, data: response.data })))
    .catch(error => dispatch(fetchContentAction.failure(error)));
};

// TODO params should not be any
export const fetchContentList = (collection: string, params: any) => (dispatch: Dispatch) => {
  dispatch(fetchContentListAction.request({ collection, params }));

  api
    .get(`/content/${collection}`, params)
    .then(response => dispatch(fetchContentListAction.success(response.data)))
    .catch(error => dispatch(fetchContentListAction.failure(error)));
};

export const createContent = (collection: string, data: Collection) => (dispatch: Dispatch) => {
  dispatch(createContentAction.request({ collection, data }));

  api
    .post(`/content/${collection}`, data)
    .then(response => dispatch(createContentAction.success(response.data)))
    .catch(error => dispatch(createContentAction.failure(error)));
};

export const updateContent = (collection: string, id: string, data: Collection) => (
  dispatch: Dispatch,
) => {
  dispatch(updateContentAction.request({ collection, id, data }));

  api
    .put(`/content/${collection}/${id}`, data)
    .then(response => dispatch(updateContentAction.success({ id, data: response.data })))
    .catch(error => dispatch(updateContentAction.failure(error)));
};

export const deleteContent = (collection: string, id: string) => (dispatch: Dispatch) => {
  dispatch(deleteContentAction.request({ collection, id }));

  api
    .delete(`/content/${collection}/${id}`)
    .then(response => dispatch(deleteContentAction.success(response.data)))
    .catch(error => dispatch(deleteContentAction.failure(error)));
};

// Selectors
export const getContentList = (state: ApplicationState, collection: string) =>
  state.content.data[collection];

export const getContent = (state: ApplicationState, collection: string, id: string) =>
  state.content.data[collection][id];

// Reducer
export default createReducer(initialState)
  .handleAction(fetchContentAction.success, (state, { payload: { collection, data } }) =>
    set(state, [collection, data.id], data),
  )
  .handleAction(fetchContentListAction.success, (state, { payload: { collection, data } }) =>
    set(state, [collection, 'data'], keyBy(data, 'id')),
  )
  .handleAction(createContentAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(updateContentAction.success, (state, { payload: { id, data } }) => {
    unset(state, ['data', id]);
    return set(state, ['data', data.id], data);
  })
  .handleAction(deleteContentAction.success, (state, { payload }) => {
    unset(state, ['data', payload.id]);
    return state;
  });
