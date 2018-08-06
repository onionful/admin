import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Unique = ({ _, errors, fieldDecorator, type }) => (
  <Form.Item validateStatus={errors[type] ? 'error' : 'success'}>
    {fieldDecorator(type)(<Checkbox>{_('contentTypes.attributes.unique')}</Checkbox>)}
  </Form.Item>
);

Unique.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Unique);
