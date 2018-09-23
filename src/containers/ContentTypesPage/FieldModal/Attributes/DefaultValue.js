import { Form, Input } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const DefaultValue = ({ _, fieldDecorator, type }) => (
  <Form.Item label={_('contentTypes.attributes.defaultValue')}>
    {fieldDecorator(type)(<Input />)}
  </Form.Item>
);

DefaultValue.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(DefaultValue);
