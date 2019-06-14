import { Collection } from 'types';
import { createAsyncAction } from 'typesafe-actions';

const fetchCollectionAction = createAsyncAction(
  'COLLECTIONS_GET_PENDING',
  'COLLECTIONS_GET_FULFILLED',
  'COLLECTIONS_GET_REJECTED',
)<string, Collection, any>();

const fetchCollectionsListAction = createAsyncAction(
  'COLLECTIONS_LIST_PENDING',
  'COLLECTIONS_LIST_FULFILLED',
  'COLLECTIONS_LIST_REJECTED',
)<any, Collection[], any>();

const createCollectionAction = createAsyncAction(
  'COLLECTIONS_CREATE_PENDING',
  'COLLECTIONS_CREATE_FULFILLED',
  'COLLECTIONS_CREATE_REJECTED',
)<Collection, Collection, any>();

const updateCollectionAction = createAsyncAction(
  'COLLECTIONS_UPDATE_PENDING',
  'COLLECTIONS_UPDATE_FULFILLED',
  'COLLECTIONS_UPDATE_REJECTED',
)<{ id: string; data: Collection }, { id: string; data: Collection }, any>();

const deleteCollectionAction = createAsyncAction(
  'COLLECTIONS_DELETE_PENDING',
  'COLLECTIONS_DELETE_FULFILLED',
  'COLLECTIONS_DELETE_REJECTED',
)<string, Collection, any>();

export default {
  fetchCollectionAction,
  fetchCollectionsListAction,
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
};
