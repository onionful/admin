import { Form, Input } from 'antd';
import { withTranslate } from 'helpers';
import { compose } from 'redux';
import { PropTypes, React } from 'utils/create';

const String = ({ form, field }) => {
  const valueKey = field.get('id');
  const label = field.get('name');

  return (
    <div>
      <Form.Item label={label}>{form.getFieldDecorator(valueKey)(<Input />)}</Form.Item>
    </div>
  );
};

String.propTypes = {
  field: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
};

export default compose(withTranslate)(String);
