import { Throw } from 'utils';
import { PropTypes, React } from 'utils/create';
import * as components from './components';

const getField = type => components[type] || Throw(`Unknown field: ${type}`);

const Field = ({ form, field, type }) => {
  const Instance = getField(type);

  return (
    <Instance
      field={field}
      form={form}
    />
  );
};

Field.propTypes = {
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
};

export default Field;
