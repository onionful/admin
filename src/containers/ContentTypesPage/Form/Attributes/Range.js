import { Col, Form, InputNumber, Row } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Range = ({ _, errors, fieldDecorator, type }) => (
  <Row>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}From`] ? 'error' : 'success'}>
        {fieldDecorator(`${type}From`)(
          <InputNumber>{_(`contentTypes.attributes.${type}From`)}</InputNumber>,
        )}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}To`] ? 'error' : 'success'}>
        {fieldDecorator(`${type}To`)(
          <InputNumber>{_(`contentTypes.attributes.${type}To`)}</InputNumber>,
        )}
      </Form.Item>
    </Col>
  </Row>
);

Range.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Range);
