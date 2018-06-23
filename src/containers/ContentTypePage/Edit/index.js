import { Button } from 'antd';
import { SectionHeader } from 'components';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { getContentType } from 'reducers/contentType/actions';
import { withPermissions } from 'helpers';
import { Component, compose, connect, PropTypes, React } from 'utils/create';
import Form from '../Form';

class ContentTypePageEdit extends Component {
  state = {
    lockedId: true,
  };

  componentDidMount() {
    console.log('DID');
  }

  handleEditClick = ({ slug }) => {
    const { pushState } = this.props;
    pushState(`/content/${slug}`);
  };

  handleLockIdClick = () => {
    const { lockedId } = this.state;
    this.setState({ lockedId: !lockedId });
  };

  handleNameChange = () => {};

  //handleSubmit = e => {
  //  const { onSubmit } = this.props;
  //
  //  e.preventDefault();
  //  this.props.form.validateFields((err, values) => {
  //    if (!err) {
  //      onSubmit(values);
  //    }
  //  });
  //};

  render() {
    console.log('RENDER');
    const {
      id,
      item,
      intl: { formatMessage },
    } = this.props;

    if (id && item.isEmpty()) {
      return <div>asd</div>;
      //throw new Error(formatMessage({ id: 'errors.contentTypeNotFound' }));
    }

    return (
      <Form item={item} onSubmit={this.handleSubmit}>
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
      </Form>
    );
  }
}

ContentTypePageEdit.propTypes = {
  intl: intlShape.isRequired,
  pushState: PropTypes.func,
  id: PropTypes.string,
  item: PropTypes.map,
};

ContentTypePageEdit.defaultProps = {
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
  withPermissions(),
)(ContentTypePageEdit);
