import { Button, Form } from 'antd';
import { SectionHeader } from 'components/index';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers/index';
import { Map } from 'immutable';
import { mapValues, noop } from 'lodash';
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

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { _, form, isNew, collection, item } = this.props;

    if (!isNew && item.isEmpty()) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    const touched = form.isFieldsTouched();

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SectionHeader
          action={
            <Button.Group>
              <Button htmlType="button" icon="rollback" onClick={this.handleCancelClick}>
                {_(`global.${touched ? 'cancel' : 'back'}`)}
              </Button>
              <Button htmlType="submit" icon="save" type="primary">
                {_('global.save')}
              </Button>
            </Button.Group>
          }
          description={_(`collection.description.${isNew ? 'create' : 'edit'}`)}
          title={_(`collection.title.${isNew ? 'create' : 'edit'}`, item)}
        />

        {collection.get('fields').map(field => (
          <Field key={field.get('id')} field={field} form={form} type={field.get('type')} />
        ))}
      </Form>
    );
  }
}

CollectionsContentPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
  path: PropTypes.string.isRequired,
  // handleCreateCollection: PropTypes.func,
  // handleUpdateCollection: PropTypes.func,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

CollectionsContentPageEdit.defaultProps = {
  // handleCreateCollection: noop,
  // handleUpdateCollection: noop,
  isNew: true,
  item: Map(),
  pushState: noop,
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
  mapValues(item.toJS(), value => Form.createFormField({ value }));

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
