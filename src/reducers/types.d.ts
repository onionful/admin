import { ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  import { ActionType } from 'typesafe-actions';

  interface Types {
    RootAction: ActionType<typeof import('./actions').default>;
  }
}
