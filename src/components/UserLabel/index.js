import { Avatar, Spin } from 'antd';
import { Map } from 'immutable';
import { fetchLabels, getUserLabel } from 'reducers/users/actions';
import { connect, PropTypes, React, styled, Component } from 'utils/create';
import { noop } from 'lodash';

const Container = styled.span({
  display: 'flex',
});

const UserName = styled.span({ marginLeft: '0.5rem' });

class UserLabel extends Component {
  componentDidMount() {
    const { handleFetchLabels, id, isLoading, user } = this.props;
    if (!isLoading && user.isEmpty()) {
      handleFetchLabels(id);
    }
  }

  render() {
    const { id, user } = this.props;

    return (
      <Container>
        <Spin key={id} size="small" spinning={user.isEmpty()}>
          <Avatar size="small" src={user.get('picture')} />
          {user.get('name') && <UserName>{user.get('name')}</UserName>}
        </Spin>
      </Container>
    );
  }
}

UserLabel.propTypes = {
  id: PropTypes.string.isRequired,
  handleFetchLabels: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.map,
};

UserLabel.defaultProps = {
  handleFetchLabels: noop,
  isLoading: false,
  user: Map(),
};

const mapStateToProps = (state, { id }) => ({
  isLoading: state.getIn(['loading', 'usersLabels', id]),
  user: getUserLabel(state, id),
});

const mapDispatchToProps = {
  handleFetchLabels: fetchLabels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLabel);
