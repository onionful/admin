import { Button } from 'antd';
import { SectionHeader } from 'components/index';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { Map } from 'immutable';
import { noop } from 'lodash';
import {
  createContentType,
  fetchContentType,
  getContentType,
  updateContentType,
} from 'reducers/contentTypes/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import Form from './Form';

class ContentTypesPageEdit extends Component {
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
      handleCreateContentType,
      handleUpdateContentType,
    } = this.props;

    (isNew ? handleCreateContentType : handleUpdateContentType(item.get('id')))(values).then(() => {
      pushState(path);
    });
  };

  render() {
    const { _, isNew, item } = this.props;

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.contentTypeNotFound'));
    }

    const meta = isNew
      ? {
          title: _('contentTypes.create.title'),
          description: _('contentTypes.create.description'),
          save: _('global.save'),
          cancel: _('global.cancel'),
        }
      : {
          title: _('contentTypes.edit.title', { name: item.get('name') }),
          description: _('contentTypes.edit.description'),
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

ContentTypesPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateContentType: PropTypes.func,
  handleUpdateContentType: PropTypes.func,
  pushState: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
};

ContentTypesPageEdit.defaultProps = {
  handleCreateContentType: noop,
  handleUpdateContentType: noop,
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
  item: getContentType(state, id),
  isNew: !id,
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
  handleCreateContentType: data => dispatch(createContentType(data)),
  handleUpdateContentType: id => data => dispatch(updateContentType(id, data)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withLoading({
    type: 'contentTypes',
    action: ({ id }) => id && fetchContentType(id),
  }),
  withPermissions(),
  withTranslate,
)(ContentTypesPageEdit);
