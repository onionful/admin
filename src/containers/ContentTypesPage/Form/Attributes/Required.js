import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Required = ({ _, errors, fieldDecorator, type }) => (
  <Form.Item validateStatus={errors[type] ? 'error' : 'success'}>
    {fieldDecorator(type)(<Checkbox>{_('contentTypes.attributes.required')}</Checkbox>)}
  </Form.Item>
);

Required.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Required);
