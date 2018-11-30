/* eslint-disable react/prefer-stateless-function */

import { Select } from 'antd';
import { withTranslate } from 'helpers';
import { formValueSelector, Field } from 'redux-form/immutable';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import { List } from 'immutable';

const allowedRefTypes = ['string'];

class FieldRef extends Component {
  render() {
    const { _, fields, type } = this.props;
    const { createField } = this.context;

    return (
      <Field
        allowClear
        component={createField(Select)}
        label={_('collections.attributes.fieldRef')}
        name={type}
      >
        {fields
          .filter(field => allowedRefTypes.includes(field.get('type')))
          .map(field => (
            <Select.Option key={field.get('id')} value={field.get('id')}>
              {field.get('name')}
            </Select.Option>
          ))}
      </Field>
    );
  }
}

FieldRef.propTypes = {
  _: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.list,
};

FieldRef.defaultProps = {
  fields: List(),
};

FieldRef.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const selector = formValueSelector('collections');

const mapDispatchToProps = state => ({
  fields: selector(state, 'fields'),
});

export default compose(
  connect(mapDispatchToProps),
  withTranslate,
)(FieldRef);
