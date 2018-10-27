import { Col, Form, Input, Row } from 'antd';
import { Lock } from 'components';
import { camelCase, isEmpty } from 'lodash';
import { Component, PropTypes, React } from 'utils/create';

class InputWithId extends Component {
  constructor(...args) {
    super(...args);

    const { form, idKey, valueKey } = this.props;
    const id = form.getFieldValue(idKey);
    const value = camelCase(form.getFieldValue(valueKey));

    this.state = { locked: isEmpty(id) || value === id };
  }

  handleValueChange = ({ target: { value } }) => {
    const { form, idKey } = this.props;
    const { locked } = this.state;

    if (locked) {
      form.setFieldsValue({ [idKey]: camelCase(value) });
    }
  };

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  render() {
    const { form, idKey, idLabel, valueKey, valueLabel } = this.props;
    const { locked } = this.state;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={valueLabel}>
            {form.getFieldDecorator(valueKey, { rules: [{ required: true }] })(
              <Input onChange={this.handleValueChange} />,
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={idLabel}>
            {form.getFieldDecorator(idKey, { rules: [{ required: true }] })(
              <Input
                disabled={locked}
                addonAfter={<Lock locked={locked} onLock={this.handleLock} />}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

InputWithId.propTypes = {
  form: PropTypes.form.isRequired,
  idKey: PropTypes.string.isRequired,
  idLabel: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  valueLabel: PropTypes.string.isRequired,
};

export default InputWithId;
