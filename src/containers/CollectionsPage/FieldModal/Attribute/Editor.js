import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Editor = ({ _, form, type }) => (
  <Form.Item>
    {form.getFieldDecorator(type, { rules: [{ required: false }] })(
      <Checkbox defaultChecked>{_(`collections.attributes.${type}`)}</Checkbox>,
    )}
  </Form.Item>
);

Editor.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Editor);
