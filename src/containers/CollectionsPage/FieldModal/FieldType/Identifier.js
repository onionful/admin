import { Checkbox, Col, Form, Input, Row } from 'antd';
import { withTranslate } from 'helpers';
import { isEmpty, kebabCase } from 'lodash';
import { Component, compose, PropTypes, React } from 'utils/create';

class Identifier extends Component {
  constructor(...args) {
    super(...args);

    const { form, type } = this.props;
    const value = form.getFieldValue(type);

    this.state = { checked: !isEmpty(value) };
  }

  handleCheckboxChange = ({ target: { checked } }) => {
    const { form, type } = this.props;

    form.setFieldsValue({ [type]: null });
    this.setState({ checked });
  };

  render() {
    const { _, form, type } = this.props;
    const { idValidator, identifierValidator } = this.context;
    const { checked } = this.state;

    return (
      <Row>
        <Col span={8}>
          <Form.Item>
            <Checkbox checked={checked} onChange={this.handleCheckboxChange}>
              {_(`collections.attributes.${type}`)}:
            </Checkbox>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item>
            {form.getFieldDecorator(type, {
              rules: [
                { required: checked },
                { validator: idValidator(type) },
                { validator: identifierValidator(type, 'id') },
              ],
              normalize: kebabCase,
            })(
              <Input
                placeholder={_(`collections.attributes.${type}_placeholder`)}
                disabled={!checked}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

Identifier.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

Identifier.contextTypes = {
  idValidator: PropTypes.func.isRequired,
  identifierValidator: PropTypes.func.isRequired,
};

export default compose(withTranslate)(Identifier);
