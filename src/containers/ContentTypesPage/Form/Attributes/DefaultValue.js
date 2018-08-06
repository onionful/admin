import { Form, Input } from 'antd';
import { compose, injectIntl, PropTypes, React } from 'utils/create';

const DefaultValue = ({ errors, fieldDecorator, intl: { formatMessage }, type }) => (
  <Form.Item
    validateStatus={errors[type] ? 'error' : 'success'}
    label={formatMessage({ id: `contentTypes.attributes.defaultValue` })}
  >
    {fieldDecorator(type)(<Input />)}
  </Form.Item>
);

DefaultValue.propTypes = {
  intl: PropTypes.intl.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(injectIntl)(DefaultValue);
