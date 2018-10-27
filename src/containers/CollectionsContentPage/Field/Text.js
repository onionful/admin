import { Form, Input } from 'antd';
import { Component, PropTypes, React } from 'utils/create';

class Text extends Component {
  constructor(...args) {
    super(...args);
    console.log('constructor');
  }

  render() {
    const { form, field } = this.props;

    return (
      <Form.Item label={field.get('name')}>
        {form.getFieldDecorator(field.get('id'))(<Input />)}
      </Form.Item>
    );
  }
}

Text.propTypes = {
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
};

export default Text;
