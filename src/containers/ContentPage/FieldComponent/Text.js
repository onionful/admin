import { Editor } from 'components';
import { withTranslate } from 'hocs';
import React from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form/immutable';
import { PropTypes } from 'utils/create';

const Text = ({ field }, { createField }) => (
  <Field
    autosize
    component={createField(Editor)}
    label={field.get('name')}
    name={field.get('id')}
  />
);

Text.propTypes = {
  field: PropTypes.map.isRequired,
};

Text.contextTypes = {
  createField: PropTypes.func.isRequired,
};

export default compose(withTranslate)(Text);
