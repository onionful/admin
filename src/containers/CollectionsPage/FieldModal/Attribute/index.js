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
        key={[type, id, attr].join()}
        type={attr}
        errors={errors || {}}
        form={form}
        fields={fields}
      />
    );
  });

Attribute.propTypes = {
  fields: PropTypes.fields.isRequired,
  form: PropTypes.form.isRequired,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Attribute.defaultProps = {
  id: undefined,
};

export default Attribute;
