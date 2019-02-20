import { Space } from 'types';

export enum SpacesActionTypes {
  SPACES_CREATE = 'SPACES_CREATE',
  SPACES_DELETE = 'SPACES_DELETE',
  SPACES_ITEM = 'SPACES_ITEM',
  SPACES_LIST = 'SPACES_LIST',
  SPACES_UPDATE = 'SPACES_UPDATE',
  SET_SPACE = 'SET_SPACE',
}

export interface SpacesState {
  current?: string;
  data: { [key: string]: Space };
}
