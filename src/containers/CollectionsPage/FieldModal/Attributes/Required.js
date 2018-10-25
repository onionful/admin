import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Required = ({ _, fieldDecorator, type }) => (
  <Form.Item>
    {fieldDecorator(type)(<Checkbox>{_('collections.attributes.required')}</Checkbox>)}
  </Form.Item>
);

Required.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Required);
