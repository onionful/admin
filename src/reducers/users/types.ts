import { User } from 'types';

export enum UsersActionTypes {
  USERS_LIST = 'USERS_LIST',
  USERS_LABELS = 'USERS_LABELS',
}

export interface UsersState {
  data: {
    users: User[];
    total: number;
    limit: number;
  };
  labels: any;
}
