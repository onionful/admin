import { Collection } from 'types';

export enum ContentActionTypes {
  CONTENT_GET = 'CONTENT_GET',
  CONTENT_LIST = 'CONTENT_LIST',
  CONTENT_CREATE = 'CONTENT_CREATE',
  CONTENT_UPDATE = 'CONTENT_UPDATE',
  CONTENT_DELETE = 'CONTENT_DELETE',
}

export interface ContentState {
  [colelction: string]: {
    [id: string]: Collection;
  };
}
