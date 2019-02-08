import { Select } from 'antd';
import { withTranslate } from 'helpers';
import { List } from 'immutable';
import { noop } from 'lodash';
import { change, Field, formValueSelector } from 'redux-form/immutable';
import { compose, connect, PropTypes, React, styled } from 'utils/create';

const allowedRefTypes = ['string'];

const StyledSelect = styled(Select)`
  width: 100%;
`;

const FieldRef = ({ _, fields, type, unset }, { createField }) => (
  <Field
    allowClear
    component={createField(StyledSelect)}
    label={_('collections.attributes.fieldRef')}
    name={type}
    placeholder="xxx"
    onChange={value => !value && unset()}
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

FieldRef.propTypes = {
  _: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.list,
  unset: PropTypes.func,
};

FieldRef.defaultProps = {
  fields: List(),
  unset: noop,
};

FieldRef.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const selector = formValueSelector('collections');

const mapStateToProps = state => ({
  fields: selector(state, 'fields'),
});

const mapDispatchToProps = (dispatch, { type }) => ({
  unset: () => dispatch(change('fieldModal', type, null)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withTranslate,
)(FieldRef);
