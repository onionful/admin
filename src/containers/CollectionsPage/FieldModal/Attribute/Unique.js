import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Unique = ({ _, form, type }) => (
  <Form.Item>
    {form.getFieldDecorator(type)(<Checkbox>{_('collections.attributes.unique')}</Checkbox>)}
  </Form.Item>
);

Unique.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Unique);
