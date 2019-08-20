import contentActions from 'actions/content';
import { keyBy, set, unset } from 'lodash';
import { ApplicationState } from 'reducers';
import { Dispatch } from 'redux';
import { Collection, Content, Dictionary } from 'types';
import { createReducer } from 'typesafe-actions';
import { api } from 'utils';

export interface ContentState {
  data: Dictionary<Dictionary<Content>>;
}

const initialState: ContentState = {
  data: {},
};

// Effects
export const fetchContent = (collection: string, id: string) => (dispatch: Dispatch) => {
  dispatch(contentActions.fetchContentAction.request({ collection, id }));

  api
    .get(`/content/${collection}/${id}`)
    .then(response => dispatch(contentActions.fetchContentAction.success({
      collection,
      data: response.data,
    })))
    .catch(error => dispatch(contentActions.fetchContentAction.failure(error)));
};

// TODO params should not be any
export const fetchContentList = (collection: string, params: any) => (dispatch: Dispatch) => {
  dispatch(contentActions.fetchContentListAction.request({ collection, params }));

  api
    .get(`/content/${collection}`, params)
    .then(response => dispatch(contentActions.fetchContentListAction.success(response.data)))
    .catch(error => dispatch(contentActions.fetchContentListAction.failure(error)));
};

export const createContent = (collection: string, data: Collection) => (dispatch: Dispatch) => {
  dispatch(contentActions.createContentAction.request({ collection, data }));

  api
    .post(`/content/${collection}`, data)
    .then(response => dispatch(contentActions.createContentAction.success(response.data)))
    .catch(error => dispatch(contentActions.createContentAction.failure(error)));
};

export const updateContent = (collection: string, id: string, data: Collection) => (
  dispatch: Dispatch,
) => {
  dispatch(contentActions.updateContentAction.request({ collection, id, data }));

  api
    .put(`/content/${collection}/${id}`, data)
    .then(response => dispatch(contentActions.updateContentAction.success({
      id,
      data: response.data,
    })))
    .catch(error => dispatch(contentActions.updateContentAction.failure(error)));
};

export const deleteContent = (collection: string, id: string) => (dispatch: Dispatch) => {
  dispatch(contentActions.deleteContentAction.request({ collection, id }));

  api
    .delete(`/content/${collection}/${id}`)
    .then(response => dispatch(contentActions.deleteContentAction.success(response.data)))
    .catch(error => dispatch(contentActions.deleteContentAction.failure(error)));
};

// Selectors
export const getContentList = (state: ApplicationState, collection: string) =>
  state.content.data[collection];

export const getContent = (state: ApplicationState, collection: string, id: string) =>
  state.content.data[collection][id];

// Reducer
export default createReducer(initialState)
  .handleAction(contentActions.fetchContentAction.success, (state, { payload: { collection, data } }) =>
    set(state, [collection, data.id], data),
  )
  .handleAction(contentActions.fetchContentListAction.success, (state, { payload: { collection, data } }) =>
    set(state, [collection, 'data'], keyBy(data, 'id')),
  )
  .handleAction(contentActions.createContentAction.success, (state, { payload }) =>
    set(state, ['data', payload.id], payload),
  )
  .handleAction(contentActions.updateContentAction.success, (state, { payload: { id, data } }) => {
    unset(state, ['data', id]);
    return set(state, ['data', data.id], data);
  })
  .handleAction(contentActions.deleteContentAction.success, (state, { payload }) => {
    unset(state, ['data', payload.id]);
    return state;
  });
