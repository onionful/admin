import { Col, Form, Input, Row } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'helpers';
import { camelCase, isEmpty } from 'lodash';
import { Component, compose, PropTypes, React } from 'utils/create';

const ID = 'id';

class Name extends Component {
  constructor(...args) {
    super(...args);

    const { form, type } = this.props;
    const id = form.getFieldValue(ID);
    const name = camelCase(form.getFieldValue(type));

    this.state = { locked: isEmpty(id) || name === id };
  }

  handleValueChange = ({ target: { value } }) => {
    const { form } = this.props;
    const { locked } = this.state;

    if (locked) {
      form.setFieldsValue({ id: camelCase(value) });
    }
  };

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  render() {
    const { _, fieldDecorator, type, errors } = this.props;
    const { locked } = this.state;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={errors.id ? 'error' : 'success'}
            label={_('collections.attributes.id')}
          >
            {fieldDecorator(ID, { rules: [{ required: true }] })(
              <Input
                addonBefore="ID"
                disabled={locked}
                addonAfter={<Lock locked={locked} onLock={this.handleLock} />}
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateStatus={errors[type] ? 'error' : 'success'}
            label={_(`collections.attributes.${type}`)}
          >
            {fieldDecorator(type, { rules: [{ required: true }] })(
              <Input onChange={this.handleValueChange} />,
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

Name.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
