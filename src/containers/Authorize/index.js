import React, { Component } from 'react';
import { withAuth, authPropTypes } from 'utils';

export class Authorize extends Component {
  componentDidMount() {
    const { auth, location } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

  render() {
    return (
      <div>loading...</div>
    );
  }
}

Authorize.propTypes = {
  ...authPropTypes,
};

export default withAuth(Authorize);
