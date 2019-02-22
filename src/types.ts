import { Permission } from 'utils';

export interface Collection {
  id?: string;
  name?: string;
}

export interface Profile {
  user_id: number;
  user_metadata: any;
  name: string;
  nickname: string;
  permissions: Permission[];
  picture: string;
}

export interface Space {
  id: string;
  name: string;
}

interface UserIdentity {
  connection: string;
  isSocial: boolean;
  provider: string;
  user_id: string;
}

export interface User {
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

// TODO: type-to-reducer temporary definition; remove when PR merged
interface reducerMapFunction<S, A> {
  (state: S, action?: A): S;
}

interface reducerMapReturnFunction<S, A> {
  (state: S | undefined, action?: A): S;
}

interface reducerMap<S, A> {
  [key: string]: reducerMap<S, A> | reducerMapFunction<S, A>;
}

declare module 'type-to-reducer' {
  export default function typeToReducer<S, A = any>(
    reducerMap: reducerMap<S, A>,
    initialState: S,
  ): reducerMapReturnFunction<S, A>;
}
