import { Button, Col, Form, Row } from 'antd';
import { Input } from 'antd/lib/input';
import { Lock, SectionHeader } from 'components/index';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { Map } from 'immutable';
import { noop } from 'lodash';
import {
  createCollection,
  fetchCollection,
  getCollection,
  updateCollection,
} from 'reducers/collections/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class CollectionsContentPageEdit extends Component {
  handleCancelClick = () => {
    const { pushState, path } = this.props;

    pushState(path);
  };

  handleSubmit = values => {
    const {
      isNew,
      item,
      pushState,
      path,
      handleCreateCollection,
      handleUpdateCollection,
    } = this.props;

    (isNew ? handleCreateCollection : handleUpdateCollection(item.get('id')))(values).then(() => {
      pushState(path);
    });
  };

  render() {
    const { _, form, isNew, collection, item } = this.props;
    const { lockedId } = this.state;

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    const meta = isNew
      ? {
          title: _('collection.create.title', { name: collection.get('name') }),
          description: _('collection.create.description'),
          save: _('global.save'),
          cancel: _('global.cancel'),
        }
      : {
          title: _('collection.edit.title', { name: collection.get('name') }),
          description: _('collection.edit.description'),
          save: _('global.update'),
          cancel: _('global.cancel'),
        };

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SectionHeader
          title={meta.title}
          description={meta.description}
          action={
            <Button.Group>
              <Button onClick={this.handleCancelClick} icon="rollback">
                {_('global.cancel')}
              </Button>
              <Button htmlType="submit" type="primary" icon="save">
                {meta.save}
              </Button>
            </Button.Group>
          }
        />

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

CollectionsContentPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  path: PropTypes.string.isRequired,
  collection: PropTypes.map.isRequired,
  handleCreateCollection: PropTypes.func,
  handleUpdateCollection: PropTypes.func,
  pushState: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
};

CollectionsContentPageEdit.defaultProps = {
  handleCreateCollection: noop,
  handleUpdateCollection: noop,
  pushState: noop,
  isNew: true,
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
)(CollectionsContentPageEdit);
