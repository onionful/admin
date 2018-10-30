import { Button, Divider, Form, Icon, Input, message, Popconfirm } from 'antd';
import { DraggableTable, FieldTypeIcon, SectionHeader } from 'components';
import { InputWithId } from 'components/Form';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { mapValues, noop } from 'lodash';
import {
  createCollection,
  fetchCollection,
  getCollection,
  updateCollection,
} from 'reducers/collections/actions';
import { Component, compose, connect, PropTypes, React, styled } from 'utils/create';
import FieldModal from './FieldModal';

const FieldName = styled.strong({
  display: 'block',
});

class CollectionsPageEdit extends Component {
  state = {
    fieldIndex: -1,
    fieldsTouched: false,
  };

  constructor(...args) {
    super(...args);

    this.fieldsModal = React.createRef();
  }

  handleCancelClick = () => {
    const { pushState, path } = this.props;

    pushState(path);
  };

  handleFieldDelete = (e, index) => {
    const { form } = this.props;
    const fields = form.getFieldValue('fields') || [];

    fields.splice(index, 1);

    form.setFieldsValue({ fields });
    this.fieldsTouched();
  };

  handleFieldSubmit = field => {
    const { form } = this.props;
    const { fieldIndex } = this.state;
    const fields = form.getFieldValue('fields') || [];

    fields.splice(fieldIndex >= 0 ? fieldIndex : fields.length, 1, field);

    form.setFieldsValue({ fields });
    this.fieldsTouched();
  };

  handleModalShow = (field, index = -1) => {
    this.setState({ fieldIndex: index }, () => this.fieldsModal.current.show(field));
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      _,
      form,
      isNew,
      item,
      handleCreateCollection,
      handleUpdateCollection,
      path,
      pushState,
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const handler = isNew ? handleCreateCollection : handleUpdateCollection(item.get('id'));
        handler(values).then(() => {
          message.success(_(`messages.collections.${isNew ? 'created' : 'updated'}`));
          pushState(`${path}/edit/${values.id}`);
        });
      }
    });
  };

  handleTableSort = (fields = []) => {
    const { form } = this.props;
    form.setFieldsValue({ fields });
    this.fieldsTouched();
  };

  fieldsTouched = () => {
    this.setState({ fieldsTouched: true });
  };

  render() {
    const { fieldsTouched } = this.state;
    const { _, isNew, item, id, form } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(_('errors.collectionNotFound'));
    }

    form.getFieldDecorator('fields');
    const touched = fieldsTouched || form.isFieldsTouched();
    const fields = form.getFieldValue('fields');

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SectionHeader
          title={_(`collections.title.${isNew ? 'create' : 'edit'}`, item)}
          description={_(`collections.description.${isNew ? 'create' : 'edit'}`)}
          action={
            <Button.Group>
              <Button onClick={this.handleCancelClick} icon="rollback">
                {_(`global.${touched ? 'cancel' : 'back'}`)}
              </Button>
              <Button htmlType="submit" type="primary" icon="save" disabled={!touched}>
                {_('global.save')}
              </Button>
            </Button.Group>
          }
        />

        <InputWithId
          autoGenerateId={isNew}
          form={form}
          idKey="id"
          valueKey="name"
          idLabel={_('global.id')}
          valueLabel={_('global.name')}
        />

        <Form.Item label={_('global.description')}>
          {form.getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>

        <Divider orientation="right">
          <Button onClick={() => this.handleModalShow()}>
            <Icon type="plus" />
            {_('collections.addField')}
          </Button>
        </Divider>

        <FieldModal
          onSubmit={this.handleFieldSubmit}
          wrappedComponentRef={this.fieldsModal}
          collection={item}
        />

        <DraggableTable
          showHeader={false}
          pagination={false}
          dataSource={fields}
          onSort={this.handleTableSort}
          rowKey="id"
          columns={[
            {
              align: 'center',
              dataIndex: 'type',
              width: 80,
              render: type => <FieldTypeIcon type={type} />,
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
              align: 'center',
              key: 'actions',
              width: 100,
              render: (field, record, index) => (
                <Button.Group>
                  <Button icon="edit" onClick={() => this.handleModalShow(field, index)} />
                  <Popconfirm
                    title={_('global.deleteQuestion')}
                    onConfirm={e => this.handleFieldDelete(e, index)}
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

CollectionsPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateCollection: PropTypes.func,
  handleUpdateCollection: PropTypes.func,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

CollectionsPageEdit.defaultProps = {
  handleCreateCollection: noop,
  handleUpdateCollection: noop,
  pushState: noop,
  isNew: true,
  id: null,
  item: Map(),
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  item: getCollection(state, id),
  isNew: !id,
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
  handleCreateCollection: data => dispatch(createCollection(data)),
  handleUpdateCollection: id => data => dispatch(updateCollection(id, data)),
});

const mapPropsToFields = ({ item = {} }) =>
  mapValues({ fields: [], ...item.toJS() }, value => Form.createFormField({ value }));

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'collections',
    action: ({ id }) => id && fetchCollection(id),
  }),
  withPermissions(),
  withTranslate,
  Form.create({ mapPropsToFields }),
)(CollectionsPageEdit);
