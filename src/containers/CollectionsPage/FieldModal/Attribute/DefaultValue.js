import { Form, Input } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const DefaultValue = ({ _, form, type }) => (
  <Form.Item label={_('collections.attributes.defaultValue')}>
    {form.getFieldDecorator(type)(<Input />)}
  </Form.Item>
);

DefaultValue.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(DefaultValue);
