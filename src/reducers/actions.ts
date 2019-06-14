import { routerActions } from 'connected-react-router';
import * as collectionsActions from 'reducers/collections/actions';
import * as contentActions from 'reducers/content/actions';
import * as profileActions from 'reducers/profile/actions';
import * as spacesActions from 'reducers/spaces/actions';
import * as usersActions from 'reducers/users/actions';

export default {
  collections: collectionsActions,
  content: contentActions,
  profile: profileActions,
  router: routerActions,
  spaces: spacesActions,
  users: usersActions,
};
