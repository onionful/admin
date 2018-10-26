import { Checkbox, Form } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const Editor = ({ _, fieldDecorator, type }) => (
  <Form.Item>
    {fieldDecorator(type, { rules: [{ required: false }] })(
      <Checkbox defaultChecked>{_('collections.attributes.editor')}</Checkbox>,
    )}
  </Form.Item>
);

Editor.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default compose(withTranslate)(Editor);
