import { Form, Select } from 'antd';
import { withTranslate } from 'helpers';
import { compose, PropTypes, React } from 'utils/create';

const DefaultValue = ({ _, fieldDecorator, type, fields }) => (
  <Form.Item label={_('collections.attributes.copyValue')}>
    {fieldDecorator(type)(
      <Select allowClear>
        {fields.filter(field => field.type === 'string').map(field => (
          <Select.Option key={field.id} value={field.id}>
            {field.name}
          </Select.Option>
        ))}
      </Select>,
    )}
  </Form.Item>
);

DefaultValue.propTypes = {
  _: PropTypes.func.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.fields.isRequired,
};

export default compose(withTranslate)(DefaultValue);
