import { Col, Form, Icon, Input, Row } from 'antd';
import { withPermissions } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import slugify from 'slugify';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';

class ContentTypesPageForm extends Component {
  state = {
    lockedId: true,
  };

  handleLockIdClick = () => {
    const { lockedId } = this.state;
    this.setState({ lockedId: !lockedId });
  };

  handleNameChange = () => {
    const { lockedId } = this.state;
    const {
      form: { getFieldValue, setFieldsValue },
    } = this.props;

    if (lockedId) {
      setTimeout(() => setFieldsValue({ id: slugify(getFieldValue('name'), { lower: true }) }), 0);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { lockedId } = this.state;
    const {
      children,
      id,
      item,
      form: { getFieldDecorator },
      intl: { formatMessage },
    } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(formatMessage({ id: 'errors.contentTypeNotFound' }));
    }

    const meta = {
      name: formatMessage({ id: 'global.name' }),
      id: formatMessage({ id: 'global.id' }),
      description: formatMessage({ id: 'global.description' }),
      errors: {
        name: 'Please input your username!',
        id: 'Please input your username!',
      },
    };

    const LockId = glamorous(props => (
      <Icon {...props} type={lockedId ? 'lock' : 'unlock'} onClick={this.handleLockIdClick} />
    ))({ cursor: 'pointer' });

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {children}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={meta.name}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: meta.errors.name }],
              })(<Input type="text" onChange={this.handleNameChange} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={meta.id}>
              {getFieldDecorator('id', {
                disabled: true,
                rules: [{ required: true, message: meta.errors.id }],
              })(<Input type="text" addonAfter={<LockId />} disabled={lockedId} />)}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={meta.description}>
          {getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>
      </Form>
    );
  }
}

ContentTypesPageForm.propTypes = {
  intl: intlShape.isRequired,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  pushState: PropTypes.func,
  id: PropTypes.string,
  item: PropTypes.map,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
  }).isRequired,
};

ContentTypesPageForm.defaultProps = {
  children: null,
  pushState: noop,
  id: null,
  item: Map(),
};

const mapPropsToFields = ({ item = {} }) => ({
  name: Form.createFormField({
    value: item.get('name'),
  }),
  id: Form.createFormField({
    value: item.get('id'),
  }),
  description: Form.createFormField({
    value: item.get('description'),
  }),
});

export default compose(
  injectIntl,
  withPermissions(),
  Form.create({ mapPropsToFields }),
)(ContentTypesPageForm);
