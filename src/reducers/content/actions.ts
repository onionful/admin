import { Collection, Content } from 'types';
import { createAsyncAction } from 'typesafe-actions';

const fetchContentAction = createAsyncAction(
  'CONTENT_GET_PENDING',
  'CONTENT_GET_FULFILLED',
  'CONTENT_GET_REJECTED',
)<
  { collection: string; id: string },
  {
    collection: string;
    data: Collection;
  },
  any
>();

const fetchContentListAction = createAsyncAction(
  'CONTENT_LIST_PENDING',
  'CONTENT_LIST_FULFILLED',
  'CONTENT_LIST_REJECTED',
)<{ collection: string; params: any }, { collection: string; data: Content[] }, any>();

const createContentAction = createAsyncAction(
  'CONTENT_CREATE_PENDING',
  'CONTENT_CREATE_FULFILLED',
  'CONTENT_CREATE_REJECTED',
)<{ collection: string; data: Content }, { id: string; data: Content }, any>();

const updateContentAction = createAsyncAction(
  'CONTENT_UPDATE_PENDING',
  'CONTENT_UPDATE_FULFILLED',
  'CONTENT_UPDATE_REJECTED',
)<{ collection: string; id: string; data: Content }, { id: string; data: Content }, any>();

const deleteContentAction = createAsyncAction(
  'CONTENT_DELETE_PENDING',
  'CONTENT_DELETE_FULFILLED',
  'CONTENT_DELETE_REJECTED',
)<{ collection: string; id: string }, Content, any>();

export default {
  fetchContentAction,
  fetchContentListAction,
  createContentAction,
  updateContentAction,
  deleteContentAction,
};
