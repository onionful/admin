import { Checkbox } from 'antd';
import { withTranslate } from 'hocs';
import React from 'react';
import { Field } from 'redux-form';
import { compose, PropTypes } from 'utils/create';

const Editor = ({ _, type }, { createField }) => (
  <Field component={createField(Checkbox)} name={type}>
    {_(`collections.attributes.${type}`)}
  </Field>
);

Editor.propTypes = {
  _: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

Editor.contextTypes = {
  createField: PropTypes.func.isRequired,
};

export default compose(withTranslate)(Editor);
