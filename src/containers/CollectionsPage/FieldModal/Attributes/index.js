import { types } from 'config';
import { Throw } from 'utils';
import { PropTypes, React } from 'utils/create';
import * as components from './components';

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const Attributes = ({ form, fields, errors, type }) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Attribute = getAttribute(attr);

    return (
      <Attribute
        key={attr}
        type={attr}
        errors={errors || {}}
        setValues={form.setFieldsValue}
        fieldDecorator={(fieldId, options = {}) => form.getFieldDecorator(fieldId, options)}
        fields={fields}
      />
    );
  });

Attributes.propTypes = {
  form: PropTypes.form.isRequired,
  fields: PropTypes.fields.isRequired,
  type: PropTypes.string.isRequired,
};

export default Attributes;
