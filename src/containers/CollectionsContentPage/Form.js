/* eslint-disable */
import { Col, Form, Input, Row } from 'antd';
import { Lock } from 'components';
import { withPermissions, withTranslate } from 'helpers';
import slugify from 'slugify';
import { Component, compose, PropTypes, React, styled } from 'utils/create';

class CollectionsContentPageForm extends Component {
  state = {
    lockedId: true,
  };

  setIdValue = name => {
    const { form } = this.props;

    setTimeout(
      () => form.setFieldsValue({ id: slugify(form.getFieldValue(name), { lower: true }) }),
      0,
    );
  };

  handleItemDelete = item => {
    console.log('item', item);
  };

  handleItemEdit = item => {
    console.log('item', item);
  };

  handleLockIdClick = () => {
    const { lockedId } = this.state;
    this.setState({ lockedId: !lockedId });
  };

  handleNameChange = () => {
    const { lockedId } = this.state;

    if (lockedId) {
      this.setIdValue('name');
    }
  };

  handleIdChange = () => {
    this.setIdValue('id');
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { lockedId } = this.state;
    const { _, children, id, item, form } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(_('errors.collectionNotFound'));
    }

    const initialValue = item.has('fields') ? item.get('fields').toJS() : [];
    form.getFieldDecorator('fields', { initialValue });

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {children}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={_('global.id')}>
              {form.getFieldDecorator('id', {
                disabled: true,
                rules: [{ required: true, message: _('errors.required') }],
              })(
                <Input
                  type="text"
                  addonAfter={<Lock locked={lockedId} onLock={this.handleLockIdClick} />}
                  disabled={lockedId}
                  onChange={this.handleIdChange}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={_('global.name')}>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: _('errors.required') }],
              })(<Input type="text" onChange={this.handleNameChange} />)}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={_('global.description')}>
          {form.getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>
      </Form>
    );
  }
}

CollectionsContentPageForm.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.map.isRequired,
  children: PropTypes.node,
  id: PropTypes.string,
};

CollectionsContentPageForm.defaultProps = {
  children: null,
  id: null,
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
  withPermissions(),
  withTranslate,
  Form.create({ mapPropsToFields }),
)(CollectionsContentPageForm);
