import { Permission } from 'utils';

export interface Profile {
  user_id: string;
  user_metadata: {
    space: string;
  };
  name: string;
  nickname: string;
  permissions: Permission[];
  picture: string;
  space: string;
}

export interface Collection {
  id: string;
  name: string;
}

export interface Content {
  id: string;
}

export interface Space {
  id: string;
  name: string;
  owners: string[];
  users: string[];
  [key: string]: string | string[];
}

interface UserIdentity {
  connection: string;
  isSocial: boolean;
  provider: string;
  user_id: string;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  identities: UserIdentity[];
  last_login: string;
  logins_count: number;
  foo: string;
  name: string;
  nickname: string;
  picture: string;
  user_id: string;
  user_metadata: {
    space: string;
  };
}

export type Dictionary<T> = Record<string, T>;
