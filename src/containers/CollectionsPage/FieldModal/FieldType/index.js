import { types } from 'config';
import React from 'react';
import { Throw } from 'utils';
import { PropTypes } from 'utils/create';

import * as components from './components';

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const FieldType = ({ type }) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Instance = getAttribute(attr);

    return <Instance key={[type, attr].join()} type={attr} />;
  });

FieldType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FieldType;
