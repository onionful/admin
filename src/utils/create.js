import RPropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';

export { default as React, Component } from 'react';
export { default as glamorous } from 'glamorous';
export { compose } from 'redux';
export { connect } from 'react-redux';

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
};
