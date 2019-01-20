import RPropTypes from 'prop-types';
import React, { Component } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import RRPropTypes from 'react-router-prop-types';
import { propTypes as RFPropTypes } from 'redux-form/immutable';

export { default as styled } from '@emotion/styled';
export { css } from '@emotion/core';
export { push } from 'connected-react-router';
export { compose } from 'redux';
export { connect } from 'react-redux';
export { React, Component };

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
  ...RRPropTypes,
  form: RFPropTypes,
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
