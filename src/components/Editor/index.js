import { fromJS, Map } from 'immutable';
import { isEqual } from 'lodash';
import { useState } from 'react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { Editor as SlateEditor } from 'slate-react';
import { PropTypes, React } from 'utils/create';

const initialValue = Plain.deserialize('');
const equal = (a, b) => isEqual(a.toJSON(), b.toJSON());

const Editor = ({ onChange, value: propValue }) => {
  const currentValue = propValue.isEmpty() ? initialValue : Value.fromJS(propValue.toJS());
  const [value, setValue] = useState(currentValue);

  if (equal(value, initialValue) && !equal(currentValue, initialValue)) {
    setValue(currentValue);
  }

  const handleChange = ({ value: newValue }) => {
    if (!equal(value, newValue)) {
      onChange(fromJS(newValue.toJS()));
      setValue(newValue);
    }
  };

  return <SlateEditor value={value} onChange={handleChange} />;
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.map,
};

Editor.defaultProps = {
  value: Map(),
};

export default Editor;
