import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import { SpacesState } from 'reducers/spaces/types';
import { UsersState } from 'reducers/users/types';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';
import auth, { AuthState } from './auth';
import collections, { CollectionsState } from './collections';
import content, { ContentState } from './content';
import errors from './errors';
import loading from './loading';
import spaces from './spaces';
import users from './users';

export interface ApplicationState {
  readonly localize: LocalizeState;
  readonly form: FormStateMap;
  readonly router: RouterState;
  readonly auth: AuthState;
  readonly collections: CollectionsState;
  readonly content: ContentState;
  readonly errors: any;
  readonly loading: any;
  readonly spaces: SpacesState;
  readonly users: UsersState;
}

export default (history: History) =>
  combineReducers<ApplicationState, any>({
    localize: localizeReducer,
    form: formReducer,
    router: connectRouter(history),
    auth,
    collections,
    content,
    errors,
    loading,
    spaces,
    users,
  });
