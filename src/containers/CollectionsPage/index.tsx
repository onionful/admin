import { withPermissions } from 'hocs';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { compose } from 'utils/create';
import CollectionsPageEdit from './Edit';
import CollectionsPageList from './List';

interface OwnProps {}

type Props = OwnProps & RouteComponentProps;

const CollectionsPage: FunctionComponent<Props> = ({ match: { path } }) => (
  <Switch>
    <Route exact component={CollectionsPageList} path={path} />
    <Route
      path={`${path}/create`}
      render={props => <CollectionsPageEdit {...props} path={path} />}
    />
    <Route
      path={`${path}/edit/:id`}
      render={props => <CollectionsPageEdit {...props} path={path} />}
    />
  </Switch>
);

export default compose<FunctionComponent<OwnProps>>(
  withPermissions(),
  withRouter,
)(CollectionsPage);
