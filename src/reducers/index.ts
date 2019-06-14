import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { localizeReducer, LocalizeState } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';
import collections, { CollectionsState } from './collections';

import content, { ContentState } from './content';
import errors from './errors';
import loading from './loading';
import profile, { ProfileState } from './profile';
import spaces, { SpacesState } from './spaces';
import users, { UsersState } from './users';

export interface ApplicationState {
  readonly localize: LocalizeState;
  readonly form: FormStateMap;
  readonly errors: any;
  readonly loading: any;

  readonly content: ContentState;
  readonly collections: CollectionsState;
  readonly profile: ProfileState;
  readonly router: RouterState;
  readonly spaces: SpacesState;
  readonly users: UsersState;
}

export default (history: History) =>
  combineReducers<ApplicationState>({
    localize: localizeReducer,
    form: formReducer,
    errors,

    content,
    collections,
    loading,
    profile,
    router: connectRouter(history),
    spaces,
    users,
  });
