import { types } from 'config';
import { Throw } from 'utils';
import { PropTypes, React } from 'utils/create';
import * as components from './components';

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const FieldType = ({ form, errors, type, id }) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Instance = getAttribute(attr);

    return <Instance key={[type, id, attr].join()} errors={errors || {}} form={form} type={attr} />;
  });

FieldType.propTypes = {
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

FieldType.defaultProps = {
  id: undefined,
};

export default FieldType;
