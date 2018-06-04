/* eslint-disable */
import { Button, Table } from 'antd';
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
    } = this.props;

    return <div>{slug}</div>;
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
)(ContentPageEdit);
