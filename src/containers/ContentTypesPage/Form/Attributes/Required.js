import { Checkbox, Form } from 'antd';
import { compose, injectIntl, PropTypes, React } from 'utils/create';

const Required = ({ errors, fieldDecorator, intl: { formatMessage }, type }) => (
  <Form.Item validateStatus={errors[type] ? 'error' : 'success'}>
    {fieldDecorator(type)(
      <Checkbox>{formatMessage({ id: `contentTypes.attributes.required` })}</Checkbox>,
    )}
  </Form.Item>
);

Required.propTypes = {
  intl: PropTypes.intl.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(injectIntl)(Required);
