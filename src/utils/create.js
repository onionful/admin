import { FormattedMarkdown } from 'components';
import RPropTypes from 'prop-types';
import React, { Component } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import RRPropTypes from 'react-router-prop-types';

export { default as glamorous } from 'glamorous';
export { compose } from 'redux';
export { connect } from 'react-redux';
export { injectIntl } from 'react-intl';
export { React, Component };

export const tm = (id, values = {}) => (
  <FormattedMarkdown id={id} values={values} defaultMessage={values.default} />
);

export const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
  ...RRPropTypes,
  intl: intlShape,
  form: RPropTypes.shape({
    validateFields: RPropTypes.func,
  }),
};
