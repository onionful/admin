import { Button } from 'antd';
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
import Form from './Form';

class CollectionsPageEdit extends Component {
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
    const { _, isNew, item } = this.props;

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    const meta = isNew
      ? {
          title: _('collections.create.title'),
          description: _('collections.create.description'),
          save: _('global.save'),
          cancel: _('global.cancel'),
        }
      : {
          title: _('collections.edit.title', { name: item.get('name') }),
          description: _('collections.edit.description'),
          save: _('global.update'),
          cancel: _('global.cancel'),
        };

    return (
      <Form item={item} onSubmit={this.handleSubmit}>
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
      </Form>
    );
  }
}

CollectionsPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateCollection: PropTypes.func,
  handleUpdateCollection: PropTypes.func,
  pushState: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
};

CollectionsPageEdit.defaultProps = {
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
)(CollectionsPageEdit);
