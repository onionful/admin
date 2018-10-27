import { Form, Input } from 'antd';
import { PropTypes, React } from 'utils/create';

const Text = ({ form, field }) => (
  <Form.Item label={field.get('name')}>
    {form.getFieldDecorator(field.get('id'))(<Input />)}
  </Form.Item>
);

Text.propTypes = {
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
};

export default Text;
