/* eslint-disable react/prefer-stateless-function */

import { Form, Select } from 'antd';
import { withTranslate } from 'helpers';
import { Component, compose, PropTypes, React } from 'utils/create';

const allowedRefTypes = ['string'];

class FieldRef extends Component {
  render() {
    const { _, form, type } = this.props;
    const { collection } = this.context;

    return (
      <Form.Item label={_('collections.attributes.fieldRef')}>
        {form.getFieldDecorator(type)(
          <Select allowClear>
            {collection
              .get('fields')
              .filter(field => allowedRefTypes.includes(field.get('type')))
              .map(field => (
                <Select.Option key={field.get('id')} value={field.get('id')}>
                  {field.get('name')}
                </Select.Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  }
}

FieldRef.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

FieldRef.contextTypes = {
  collection: PropTypes.map.isRequired,
};

export default compose(withTranslate)(FieldRef);
