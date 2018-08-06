import { Col, Form, Input, Row } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'helpers';
import { camelCase } from 'lodash';
import { Component, compose, PropTypes, React } from 'utils/create';

class Name extends Component {
  state = {
    locked: true,
  };

  handleValueChange = ({ target: { value } }) => {
    const { setValues } = this.props;
    const { locked } = this.state;

    if (locked) {
      setValues({ id: camelCase(value) });
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
            label={_('contentTypes.attributes.id')}
          >
            {fieldDecorator('id')(
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
            label={_(`contentTypes.attributes.${type}`)}
          >
            {fieldDecorator(type)(<Input onChange={this.handleValueChange} />)}
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

Name.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};

export default compose(withTranslate)(Name);
