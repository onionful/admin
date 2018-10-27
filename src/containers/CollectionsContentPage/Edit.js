import { Button, Form } from 'antd';
import { SectionHeader } from 'components/index';
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
import Field from './Field';

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

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    const meta = isNew
      ? {
          title: _('collection.create.title', collection.toJS()),
          description: _('collection.create.description', collection.toJS()),
          save: _('global.save'),
          cancel: _('global.cancel'),
        }
      : {
          title: _('collection.edit.title', collection.toJS()),
          description: _('collection.edit.description', collection.toJS()),
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

        {collection.get('fields').map(field => (
          <Field key={field.get('id')} form={form} field={field} type={field.get('type')} />
        ))}
      </Form>
    );
  }
}

CollectionsContentPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
  handleCreateCollection: PropTypes.func,
  handleUpdateCollection: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  path: PropTypes.string.isRequired,
  pushState: PropTypes.func,
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
