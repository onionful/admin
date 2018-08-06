import { Form, Input } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const DefaultValue = ({ _, errors, fieldDecorator, type }) => (
  <Form.Item
    validateStatus={errors[type] ? 'error' : 'success'}
    label={_('contentTypes.attributes.defaultValue')}
  >
    {fieldDecorator(type)(<Input />)}
  </Form.Item>
);

DefaultValue.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(DefaultValue);
