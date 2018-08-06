import { Col, Form, InputNumber, Row } from 'antd';
import { compose, injectIntl, PropTypes, React } from 'utils/create';

const Range = ({ errors, fieldDecorator, intl: { formatMessage }, type }) => (
  <Row>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}From`] ? 'error' : 'success'}>
        {fieldDecorator(`${type}From`)(
          <InputNumber>{formatMessage({ id: `contentTypes.attributes.${type}From` })}</InputNumber>,
        )}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item validateStatus={errors[`${type}To`] ? 'error' : 'success'}>
        {fieldDecorator(`${type}To`)(
          <InputNumber>{formatMessage({ id: `contentTypes.attributes.${type}To` })}</InputNumber>,
        )}
      </Form.Item>
    </Col>
  </Row>
);

Range.propTypes = {
  intl: PropTypes.intl.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(injectIntl)(Range);
