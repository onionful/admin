import { Button, Col, Form, Icon, Input, Row } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { getContentType } from 'reducers/contentType/actions';
import { withPermissions } from 'utils';
import { Component, compose, connect, glamorous, PropTypes, React } from 'utils/create';

class ContentTypePageForm extends Component {
  state = {
    lockedId: true,
  };

  handleEditClick = ({ slug }) => {
    const { pushState } = this.props;
    pushState(`/content/${slug}`);
  };

  handleLockIdClick = () => {
    const { lockedId } = this.state;
    this.setState({ lockedId: !lockedId });
  };

  handleNameChange = () => {};

  handleSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { lockedId } = this.state;
    const {
      id,
      item,
      form: { getFieldDecorator },
      intl: { formatMessage },
    } = this.props;

    if (id && item.isEmpty()) {
      throw new Error(formatMessage({ id: 'errors.contentTypeNotFound' }));
    }

    const LockId = glamorous(props => (
      <Icon {...props} type={lockedId ? 'lock' : 'unlock'} onClick={this.handleLockIdClick} />
    ))({ cursor: 'pointer' });

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <SectionHeader
          title={formatMessage({ id: 'contentType.title' })}
          description={formatMessage({ id: 'contentType.description' })}
          action={
            <Button.Group>
              <Button onClick={this.onCancelClick} icon="rollback">
                {formatMessage({ id: 'global.cancel' })}
              </Button>
              <Button onClick={this.onUpdateClick} htmlType="submit" type="primary" icon="save">
                {id ? formatMessage({ id: 'global.update' }) : formatMessage({ id: 'global.save' })}
              </Button>
            </Button.Group>
          }
        />

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={formatMessage({ id: 'global.name' })}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input type="text" onChange={this.handleNameChange} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={formatMessage({ id: 'global.id' })}>
              {getFieldDecorator('id', {
                disabled: true,
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input type="text" addonAfter={<LockId />} disabled={lockedId} />)}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={formatMessage({ id: 'global.description' })}>
          {getFieldDecorator('description')(<Input.TextArea autosize />)}
        </Form.Item>
      </Form>
    );
  }
}

ContentTypePageForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pushState: PropTypes.func,
  id: PropTypes.string,
  item: PropTypes.map,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
  }).isRequired,
};

ContentTypePageForm.defaultProps = {
  pushState: noop,
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
  id,
  item: getContentType(state, id),
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
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
  injectIntl,
  withPermissions(),
  Form.create({ mapPropsToFields }),
)(ContentTypePageForm);
