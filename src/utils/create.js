import RPropTypes from 'prop-types';
import React, { Component } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import RRPropTypes from 'react-router-prop-types';

export { default as styled, css } from 'react-emotion';
export { compose } from 'redux';
export { connect } from 'react-redux';
export { React, Component };

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
  ...RRPropTypes,
  form: RPropTypes.shape({
    validateFields: RPropTypes.func,
  }),
  fields: RPropTypes.arrayOf(
    RPropTypes.shape({
      id: RPropTypes.string.isRequired,
      name: RPropTypes.string.isRequired,
      type: RPropTypes.string.isRequired,
    }),
  ),
};

export const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';
