import { Space } from 'types';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';

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

const fetchSpaceAction = createAsyncAction(
  'SPACES_ITEM_PENDING',
  'SPACES_ITEM_FULFILLED',
  'SPACES_ITEM_REJECTED',
)<string, Space, any>();

const fetchSpacesListAction = createAsyncAction(
  'SPACES_LIST_PENDING',
  'SPACES_LIST_FULFILLED',
  'SPACES_LIST_REJECTED',
)<undefined, Space[], any>();

const updateSpaceAction = createAsyncAction(
  'SPACES_UPDATE_PENDING',
  'SPACES_UPDATE_FULFILLED',
  'SPACES_UPDATE_REJECTED',
)<{ id: string; data: Space }, { id: string; data: Space }, any>();

const setSpaceAction = createStandardAction('SPACES_SET')<string>();

export default {
  createSpaceAction,
  deleteSpaceAction,
  fetchSpaceAction,
  fetchSpacesListAction,
  updateSpaceAction,
  setSpaceAction,
};
