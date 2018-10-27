import { Checkbox, Col, Input, Row } from 'antd';
import { withTranslate } from 'helpers';
import { Component, compose, PropTypes, React } from 'utils/create';
import { isEmpty } from 'lodash';

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
    const { checked } = this.state;

    return (
      <Row type="flex" align="middle">
        <Col span={8}>
          <Checkbox checked={checked} onChange={this.handleCheckboxChange}>
            {_(`collections.attributes.${type}`)}:
          </Checkbox>
        </Col>
        <Col span={16}>
          {form.getFieldDecorator(type)(
            <Input
              placeholder={_(`collections.attributes.${type}_placeholder`)}
              disabled={!checked}
            />,
          )}
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
export default compose(withTranslate)(Identifier);
