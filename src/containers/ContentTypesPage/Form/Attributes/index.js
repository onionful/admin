import { Form } from 'antd';
import { types } from 'config';
import { Throw } from 'utils';
import { compose, injectIntl, PropTypes, React } from 'utils/create';
import defaultValue from './DefaultValue';
import name from './Name';

const components = {
  name,
  defaultValue,
};

const getAttribute = type => components[type] || Throw(`Unknown attribute: ${type}`);

const Attributes = ({
  form: { getFieldDecorator, setFieldsValue },
  intl: { formatMessage },
  type,
}) =>
  (types[type] || Throw(`Unknown type: ${type}`)).attributes.map(attr => {
    const Attribute = getAttribute(attr);
    return (
      <Form.Item key={attr} label={formatMessage({ id: `contentTypes.attributes.${attr}` })}>
        <Attribute
          type={attr}
          setValues={setFieldsValue}
          fieldDecorator={(fieldId, props = {}) =>
            getFieldDecorator(fieldId, {
              rules: [{ required: true, message: 'Please input your username!', ...props }],
            })
          }
        />
      </Form.Item>
    );
  });

Attributes.propTypes = {
  form: PropTypes.form.isRequired,
  type: PropTypes.string.isRequired,
  intl: PropTypes.intl.isRequired,
};

export default compose(injectIntl)(Attributes);
