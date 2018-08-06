import { Checkbox, Form } from 'antd';
import { compose, injectIntl, PropTypes, React } from 'utils/create';

const Unique = ({ errors, fieldDecorator, intl: { formatMessage }, type }) => (
  <Form.Item validateStatus={errors[type] ? 'error' : 'success'}>
    {fieldDecorator(type)(
      <Checkbox>{formatMessage({ id: `contentTypes.attributes.unique` })}</Checkbox>,
    )}
  </Form.Item>
);

Unique.propTypes = {
  intl: PropTypes.intl.isRequired,
  fieldDecorator: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired, // eslint-disable-line
  type: PropTypes.string.isRequired,
};
export default compose(injectIntl)(Unique);
