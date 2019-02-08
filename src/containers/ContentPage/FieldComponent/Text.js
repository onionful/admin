import { Input } from 'antd';
import { withTranslate } from 'helpers';
import { compose } from 'redux';
import { Field } from 'redux-form/immutable';
import { PropTypes, React } from 'utils/create';

const Text = ({ field }, { createField }) => (
  <Field component={createField(Input.TextArea)} label={field.get('name')} name={field.get('id')} />
);

Text.propTypes = {
  field: PropTypes.map.isRequired,
};

Text.contextTypes = {
  createField: PropTypes.func.isRequired,
};

export default compose(withTranslate)(Text);
