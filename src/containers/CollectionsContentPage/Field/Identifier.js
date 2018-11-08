import { Form, Input } from 'antd';
import { Lock } from 'components';
import { isEmpty, kebabCase } from 'lodash';
import { Component, PropTypes, React } from 'utils/create';

class Identifier extends Component {
  constructor(...args) {
    super(...args);

    const { form, field } = this.props;
    const id = form.getFieldValue(field.get('id'));
    // const value = kebabCase(form.getFieldValue(valueKey));
    const value = 'b';

    this.state = { locked: isEmpty(id) || value === id };
  }

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  handleRefChange = () => {
    const { form, field } = this.props;
    const value = form.getFieldValue(field.get('fieldRef'));

    form.setFieldsValue({
      [field.get('id')]: kebabCase(value),
    });
  };

  render() {
    const { form, field } = this.props;
    const { locked } = this.state;

    return (
      <div>
        <Form.Item label={field.get('name')}>
          {form.getFieldDecorator(field.get('id'))(
            <Input
              disabled={locked}
              addonAfter={<Lock locked={locked} onLock={this.handleLock} />}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

Identifier.propTypes = {
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
};

export default Identifier;
