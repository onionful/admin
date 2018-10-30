import { Col, Form, InputNumber, Row } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Range = ({ _, errors, form, type }) => (
  <Row>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}From`] ? 'error' : 'success'}>
        {form.getFieldDecorator(`${type}From`)(
          <InputNumber>{_(`collections.attributes.${type}From`)}</InputNumber>,
        )}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}To`] ? 'error' : 'success'}>
        {form.getFieldDecorator(`${type}To`)(
          <InputNumber>{_(`collections.attributes.${type}To`)}</InputNumber>,
        )}
      </Form.Item>
    </Col>
  </Row>
);

Range.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Range);
