import { Collection } from 'types';

export enum CollectionsActionTypes {
  COLLECTIONS_GET = 'COLLECTIONS_GET',
  COLLECTIONS_LIST = 'COLLECTIONS_LIST',
  COLLECTIONS_CREATE = 'COLLECTIONS_CREATE',
  COLLECTIONS_UPDATE = 'COLLECTIONS_UPDATE',
  COLLECTIONS_DELETE = 'COLLECTIONS_DELETE',
}

export interface CollectionsState {
  data: { [key: string]: Collection };
}
