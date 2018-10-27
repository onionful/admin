import { types } from 'config';
import { Throw } from 'utils';
import { PropTypes, React } from 'utils/create';
import * as components from './components';

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const Attribute = ({ form, fields, errors, type, id }) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Instance = getAttribute(attr);

    return (
      <Instance
        key={attr}
        type={attr}
        errors={errors || {}}
        setValues={form.setFieldsValue}
        fieldDecorator={(fieldId, options = {}) => form.getFieldDecorator(fieldId, options)}
        fields={fields}
      />
    );
  });

Attribute.propTypes = {
  form: PropTypes.form.isRequired,
  fields: PropTypes.fields.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Attribute.defaultProps = {
  id: undefined,
};

export default Attribute;
