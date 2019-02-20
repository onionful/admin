import { Checkbox, Form } from 'antd';
import { withTranslate } from 'hocs';
import React from 'react';
import { compose, PropTypes } from 'utils/create';

const Required = ({ _, form, type }) => (
  <Form.Item>
    {form.getFieldDecorator(type)(<Checkbox>{_(`collections.attributes.${type}`)}</Checkbox>)}
  </Form.Item>
);

Required.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Required);
