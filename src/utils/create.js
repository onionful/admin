import React, { Component } from 'react';
import RPropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { FormattedMarkdown } from 'components';

export { default as glamorous } from 'glamorous';
export { compose } from 'redux';
export { connect } from 'react-redux';
export { React, Component };

export const t = (id, values = {}) => (
  <FormattedMessage id={id} values={values} defaultMessage={values.default} />
);

export const tm = (id, values = {}) => (
  <FormattedMarkdown id={id} values={values} defaultMessage={values.default} />
);

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
};
