import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import SpacesPageEdit from './Edit';
import SpacesPageList from './List';

type Props = RouteComponentProps;

const SpacesPage: FunctionComponent<Props> = ({ match: { path } }) => (
  <Switch>
    <Route exact component={SpacesPageList} path={path} />
    <Route
      path={`${path}/create`}
      render={props => <SpacesPageEdit {...props} path={path} create />}
    />
    <Route path={`${path}/edit/:id`} render={props => <SpacesPageEdit {...props} path={path} />} />
  </Switch>
);

export default withRouter(SpacesPage);
