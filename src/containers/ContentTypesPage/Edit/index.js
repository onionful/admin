/* eslint-disable */
import { Form, Input } from 'antd';
import { Editor } from 'components';
import { List } from 'immutable';
import { push } from 'react-router-redux';
import { compose, connect, Component, PropTypes, React } from 'utils/create';
import { withPermissions } from 'utils';
import { noop } from 'lodash';

class ContentPageEdit extends Component {
  onEditClick = ({ slug }) => {
    const { pushState } = this.props;
    pushState(`/content/${slug}`);
  };

  render() {
    const {
      match: {
        params: { slug },
      },
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input type="text" size="large" placeholder="Title" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('slug', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input type="text" placeholder="Slug" />)}
        </Form.Item>

        <Editor />
      </Form>
    );
  }
}

ContentPageEdit.propTypes = {
  pushState: PropTypes.func,
};

ContentPageEdit.defaultProps = {
  pushState: noop,
};

const mapStateToProps = state => ({
  data: state.getIn(['content', 'data']),
});

const mapDispatchToProps = dispatch => ({
  pushState: path => dispatch(push(path)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPermissions(),
  Form.create(),
)(ContentPageEdit);
