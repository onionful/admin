import { Form, Input } from 'antd';
import { InputWithId } from 'components/Form';
import { withTranslate } from 'helpers';
import { compose } from 'redux';
import { PropTypes, React } from 'utils/create';

const String = ({ _, form, field }) => {
  const idKey = field.get('identifier');
  const valueKey = field.get('id');
  const label = field.get('name');

  return idKey ? (
    <InputWithId
      form={form}
      idKey={idKey}
      idLabel={_('global.id')}
      valueKey={valueKey}
      valueLabel={label}
    />
  ) : (
    form.getFieldDecorator(valueKey)(
      <Form.Item label={label}>
        <Input />
      </Form.Item>,
    )
  );
};

String.propTypes = {
  _: PropTypes.func.isRequired,
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
};

export default compose(withTranslate)(String);
