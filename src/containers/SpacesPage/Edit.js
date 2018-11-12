import { Button, Form, Input, message } from 'antd';
import { SectionHeader } from 'components';
import { InputWithId, UsersSelect } from 'components/Form';
import { push } from 'connected-react-router';
import { withLoading, withPermissions, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { mapValues, noop } from 'lodash';
import { createSpace, fetchSpace, getSpace, updateSpace } from 'reducers/spaces/actions';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class SpacesPageEdit extends Component {
  state = {
    fieldsTouched: false,
  };

  handleCancelClick = () => {
    const { pushState, path } = this.props;

    pushState(path);
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      _,
      form,
      isNew,
      item,
      handleCreateSpace,
      handleUpdateSpace,
      path,
      pushState,
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const handler = isNew ? handleCreateSpace : handleUpdateSpace(item.get('id'));
        handler(values).then(() => {
          message.success(_(`messages.spaces.${isNew ? 'created' : 'updated'}`));
          pushState(`${path}/edit/${values.id}`);
        });
      }
    });
  };

  render() {
    const { fieldsTouched } = this.state;
    const { _, id, isNew, item, form } = this.props;

    if (id && !item.get('id')) {
      // throw new Error(_('errors.collectionNotFound'));
    }

    form.getFieldDecorator('fields');
    const touched = fieldsTouched || form.isFieldsTouched();

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SectionHeader
          action={
            <Button.Group>
              <Button htmlType="button" icon="rollback" onClick={this.handleCancelClick}>
                {_(`global.${touched ? 'cancel' : 'back'}`)}
              </Button>
              <Button disabled={!touched} htmlType="submit" icon="save" type="primary">
                {_('global.save')}
              </Button>
            </Button.Group>
          }
          description={_(`collections.description.${isNew ? 'create' : 'edit'}`)}
          title={_(`collections.title.${isNew ? 'create' : 'edit'}`, item)}
        />

        <InputWithId
          autoGenerateId={isNew}
          form={form}
          idKey="id"
          idLabel={_('global.id')}
          valueKey="name"
          valueLabel={_('global.name')}
        />

        <Form.Item label={_('global.url')}>
          {form.getFieldDecorator('url', { rules: [{ type: 'url' }] })(<Input />)}
        </Form.Item>

        <UsersSelect form={form} id="owners" label={_('global.owners')} />
      </Form>
    );
  }
}

SpacesPageEdit.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  path: PropTypes.string.isRequired,
  handleCreateSpace: PropTypes.func,
  handleUpdateSpace: PropTypes.func,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  item: PropTypes.map,
  pushState: PropTypes.func,
};

SpacesPageEdit.defaultProps = {
  handleCreateSpace: noop,
  handleUpdateSpace: noop,
  id: null,
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
  isNew: !id,
  id,
  item: getSpace(state, id),
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
  handleCreateSpace: data => dispatch(createSpace(data)),
  handleUpdateSpace: id => data => dispatch(updateSpace(id, data)),
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
    action: ({ id }) => id && fetchSpace(id),
  }),
  withPermissions(),
  withTranslate,
  Form.create({ mapPropsToFields }),
)(SpacesPageEdit);
