import React from 'react';
import { Throw } from 'utils';
import { PropTypes } from 'utils/create';
import * as components from './components';

const FieldComponent = ({ field }) => {
  const type = field.get('type');
  const Instance = components[type] || Throw(`Unknown field: ${type}`);

  return <Instance field={field} />;
};

FieldComponent.propTypes = {
  field: PropTypes.map.isRequired,
};

export default FieldComponent;
