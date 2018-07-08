import { Form, Input } from 'antd';
import { types } from 'config';
import { Component, compose, PropTypes, React } from 'utils/create';

class Attributes extends Component {
  componentDidMount() {
    console.log('x');
  }

  render() {
    const {
      form: { getFieldDecorator },
      type,
    } = this.props;
    const { attributes } = types[type];

    console.log('attributes', attributes);

    return (
      <Form>
        {attributes.map(attr => (
          <Form.Item>
            {getFieldDecorator(attr, {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input placeholder="Username" />)}
          </Form.Item>
        ))}
      </Form>
    );
  }
}

Attributes.propTypes = {
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default compose(Form.create())(Attributes);
