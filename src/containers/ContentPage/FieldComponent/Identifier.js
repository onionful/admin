import { Input } from 'antd';
import { Lock } from 'components';
import { isEmpty, kebabCase, noop } from 'lodash';
import { useEffect, useState } from 'react';
import { change, Field, formValueSelector } from 'redux-form/immutable';
import { connect, PropTypes, React } from 'utils/create';

const Identifier = ({ field, handleChange, refValue }, { createField }) => {
  const value = field.get('value');
  const [locked, setLocked] = useState(isEmpty(value) || value === kebabCase(refValue));

  useEffect(() => {
    if (locked) {
      handleChange('content', field.get('id'), kebabCase(refValue));
    }
  }, [refValue, locked]);

  return (
    <Field
      addonAfter={<Lock locked={locked} onLock={() => setLocked(!locked)} />}
      component={createField(Input)}
      disabled={locked}
      label={field.get('name')}
      name={field.get('id')}
    />
  );
};

Identifier.propTypes = {
  field: PropTypes.map.isRequired,
  handleChange: PropTypes.func,
  refValue: PropTypes.string,
};

Identifier.defaultProps = {
  handleChange: noop,
  refValue: '',
};

Identifier.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const selector = formValueSelector('content');

const mapStateToProps = (state, { field }) => {
  return {
    refValue: selector(state, field.get('fieldRef')),
  };
};

const mapDispatchToProps = {
  handleChange: change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Identifier);
