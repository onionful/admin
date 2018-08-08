import { types } from 'config';
import { Throw } from 'utils';
import { PropTypes, React } from 'utils/create';
import * as components from './components';

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const Attributes = ({ form, errors, type }) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Attribute = getAttribute(attr);
    return (
      <Attribute
        key={attr}
        type={attr}
        errors={errors || {}}
        setValues={form.setFieldsValue}
        fieldDecorator={(fieldId, props = {}) =>
          form.getFieldDecorator(fieldId, {
            rules: [{ message: 'Please input your username!', ...props }],
          })
        }
      />
    );
  });

Attributes.propTypes = {
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default Attributes;
