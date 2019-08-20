import { Input } from 'antd';
import { withTranslate } from 'hocs';
import React from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import { PropTypes } from 'utils/create';

const String = ({ field }, { createField }) => (
  <Field
    component={createField(field.get('multiline') ? Input.TextArea : Input)}
    label={field.get('name')}
    name={field.get('id')}
  />
);

String.propTypes = {
  field: PropTypes.map.isRequired,
};

String.contextTypes = {
  createField: PropTypes.func.isRequired,
};

export default compose(withTranslate)(String);
