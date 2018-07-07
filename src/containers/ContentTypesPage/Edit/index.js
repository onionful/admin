import { Button } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { withLoading, withPermissions } from 'helpers';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { createContentType, fetchContentType, getContentType } from 'reducers/contentTypes/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import Form from '../Form';

class ContentTypesPageEdit extends Component {
  handleCancelClick = () => {
    const { pushState, path } = this.props;

    pushState(path);
  };

  handleSubmit = values => {
    const { isNew, pushState, path, handleCreateContentType } = this.props;

    if (isNew) {
      handleCreateContentType(values).then(() => {
        pushState(path);
      });
    }
  };

  render() {
    const {
      isNew,
      item,
      intl: { formatMessage },
    } = this.props;

    if (!isNew && item.isEmpty()) {
      return <div>asd</div>;
      //throw new Error(formatMessage({ id: 'errors.contentTypeNotFound' }));
    }

    const meta = isNew
      ? {
          title: formatMessage({ id: 'contentTypes.create.title' }),
          description: formatMessage({ id: 'contentTypes.create.description' }),
          save: formatMessage({ id: 'global.save' }),
          cancel: formatMessage({ id: 'global.cancel' }),
        }
      : {
          title: formatMessage({ id: 'contentTypes.edit.title' }, { name: item.get('name') }),
          description: formatMessage({ id: 'contentTypes.edit.description' }),
          save: formatMessage({ id: 'global.update' }),
          cancel: formatMessage({ id: 'global.cancel' }),
        };

    return (
      <Form item={item} onSubmit={this.handleSubmit}>
        <SectionHeader
          title={meta.title}
          description={meta.description}
          action={
            <Button.Group>
              <Button onClick={this.handleCancelClick} icon="rollback">
                {formatMessage({ id: 'global.cancel' })}
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
  intl: intlShape.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateContentType: PropTypes.func,
  pushState: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
};

ContentTypesPageEdit.defaultProps = {
  handleCreateContentType: noop,
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
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
  withLoading({
    type: 'contentTypes',
    action: ({ id }) => id && fetchContentType(id),
  }),
  withPermissions(),
)(ContentTypesPageEdit);
