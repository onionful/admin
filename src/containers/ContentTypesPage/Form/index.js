import { Button, Col, Divider, Form, Icon, Input, Popconfirm, Row, Table } from 'antd';
import { ContentTypeIcon } from 'components';
import { withPermissions } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import slugify from 'slugify';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';
import FieldsModal from './FieldsModal';

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
      children,
      id,
      item,
      form: { getFieldDecorator },
      intl: { formatMessage },
    } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(formatMessage({ id: 'errors.contentTypeNotFound' }));
    }

    const fields = [
      { id: 'title', name: 'title', type: 'string' },
      { id: 'identifier', name: 'identifier', type: 'string', unique: true },
      { id: 'content', name: 'content', type: 'text' },
      { id: 'images', name: 'images', type: 'media', multiple: true },
      { id: 'someNumber', name: 'some number', type: 'number' },
      { id: 'someDate', name: 'some date', type: 'date' },
      { id: 'someEmail', name: 'some email', type: 'email' },
      { id: 'someBool', name: 'some bool', type: 'bool' },
    ];

    const LockId = glamorous(props => (
      <Icon {...props} type={lockedId ? 'lock' : 'unlock'} onClick={this.handleLockIdClick} />
    ))({ cursor: 'pointer' });

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {children}

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={formatMessage({ id: 'global.name' })}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: formatMessage({ id: 'errors.required' }) }],
              })(<Input type="text" onChange={this.handleNameChange} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={formatMessage({ id: 'global.id' })}>
              {getFieldDecorator('id', {
                disabled: true,
                rules: [{ required: true, message: formatMessage({ id: 'errors.required' }) }],
              })(<Input type="text" addonAfter={<LockId />} disabled={lockedId} />)}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={formatMessage({ id: 'global.description' })}>
          {getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>

        <Divider orientation="right">
          <Button onClick={() => this.handleFieldsModalShow()}>
            <Icon type="plus" />
            {formatMessage({ id: 'contentTypes.addField' }, { type: null })}
          </Button>
        </Divider>

        <FieldsModal
          onRef={modal => {
            this.fieldsModal = modal;
          }}
        />

        <Table
          showHeader={false}
          pagination={false}
          dataSource={fields}
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
                    title={formatMessage({ id: 'global.removeQuestion' })}
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
  form: PropTypes.form.isRequired,
  intl: intlShape.isRequired,
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
  injectIntl,
  withPermissions(),
  Form.create({ mapPropsToFields }),
)(ContentTypesPageForm);
