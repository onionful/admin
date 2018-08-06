/* eslint-disable */
import { Button, Col, Divider, Form, Icon, Input, Popconfirm, Row, Table } from 'antd';
import { ContentTypeIcon, Lock } from 'components';
import { withPermissions, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import slugify from 'slugify';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';
import FieldModal from './FieldModal';

const FieldName = glamorous.strong({
  display: 'block',
});

class ContentTypesPageForm extends Component {
  state = {
    lockedId: true,
  };

  handleFieldDelete = (e, field) => {
    console.log('e', e);
    console.log('field', field);
  };

  handleFieldSubmit = field => {
    console.log('field', field);
  };

  handleFieldsModalShow = field => {
    this.fieldsModal.show(field);
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

    const {
      onSubmit,
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { lockedId } = this.state;
    const {
      _,
      children,
      id,
      item,
      form: { getFieldDecorator },
    } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(_('errors.contentTypeNotFound'));
    }

    //const fields = [
    //  { id: 'title', name: 'title', type: 'string' },
    //  { id: 'identifier', name: 'identifier', type: 'string', unique: true },
    //  { id: 'content', name: 'content', type: 'text' },
    //  { id: 'images', name: 'images', type: 'media', multiple: true },
    //  { id: 'someNumber', name: 'some number', type: 'number' },
    //  { id: 'someDate', name: 'some date', type: 'date' },
    //  { id: 'someEmail', name: 'some email', type: 'email' },
    //  { id: 'someBool', name: 'some bool', type: 'bool' },
    //];

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {children}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={_('global.name')}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: _('errors.required') }],
              })(<Input type="text" onChange={this.handleNameChange} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={_('global.id')}>
              {getFieldDecorator('id', {
                disabled: true,
                rules: [{ required: true, message: _('errors.required') }],
              })(
                <Input
                  type="text"
                  addonAfter={<Lock locked={lockedId} onLock={this.handleLockIdClick} />}
                  disabled={lockedId}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={_('global.description')}>
          {getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>

        <Divider orientation="right">
          <Button onClick={() => this.handleFieldsModalShow()}>
            <Icon type="plus" />
            {_('contentTypes.addField', { type: null })}
          </Button>
        </Divider>

        <FieldModal
          onSubmit={this.handleFieldSubmit}
          wrappedComponentRef={modal => {
            this.fieldsModal = modal;
          }}
        />

        <Table
          showHeader={false}
          pagination={false}
          dataSource={item.get('fields')}
          rowKey="id"
          columns={[
            {
              dataIndex: 'type',
              render: type => <ContentTypeIcon type={type} />,
              width: 80,
              align: 'center',
            },
            {
              key: 'name',
              render: field => (
                <div>
                  <FieldName>{field.name}</FieldName>
                  <small>{field.id}</small>
                </div>
              ),
            },
            {
              key: 'actions',
              width: 100,
              align: 'center',
              render: field => (
                <Button.Group>
                  <Button icon="edit" onClick={() => this.handleFieldsModalShow(field)} />
                  <Popconfirm
                    title={_('global.removeQuestion')}
                    onConfirm={e => this.handleFieldDelete(e, field)}
                  >
                    <Button icon="delete" type="danger" />
                  </Popconfirm>
                </Button.Group>
              ),
            },
          ]}
        />
      </Form>
    );
  }
}

ContentTypesPageForm.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
  id: PropTypes.string,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

ContentTypesPageForm.defaultProps = {
  children: null,
  id: null,
  item: Map(),
  pushState: noop,
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
)(ContentTypesPageForm);
