import { withPermissions } from 'hocs';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { compose } from 'utils/create';
import SpacesPageEdit from './Edit';
import SpacesPageList from './List';

interface OwnProps {}

type Props = OwnProps & RouteComponentProps;

const SpacesPage: FunctionComponent<Props> = ({ match: { path } }) => (
  <Switch>
    <Route exact component={SpacesPageList} path={path} />
    <Route path={`${path}/create`} render={props => <SpacesPageEdit {...props} path={path} />} />
    <Route path={`${path}/edit/:id`} render={props => <SpacesPageEdit {...props} path={path} />} />
  </Switch>
);

export default compose(
  withPermissions(),
  withRouter,
)(SpacesPage);
