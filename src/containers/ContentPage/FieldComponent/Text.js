import { Input } from 'antd';
import { Editor } from 'components';
import { withTranslate } from 'helpers';
import { compose } from 'redux';
import { Field } from 'redux-form/immutable';
import { PropTypes, React } from 'utils/create';

const Text = ({ field }, { createField }) => (
  <Field
    autosize
    component={createField(field.get('editor') ? Editor : Input.TextArea)}
    label={field.get('name')}
    name={field.get('id')}
  />
);

Text.propTypes = {
  field: PropTypes.map.isRequired,
};

Text.contextTypes = {
  createField: PropTypes.func.isRequired,
};

export default compose(withTranslate)(Text);
