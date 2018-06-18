import React, { Component } from 'react';
import RPropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

export { default as glamorous } from 'glamorous';
export { compose } from 'redux';
export { connect } from 'react-redux';
export { React, Component };

export const _ = id => <FormattedMessage id={id} />;

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
};
