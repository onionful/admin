import { Avatar, Spin } from 'antd';
import { Map } from 'immutable';
import { noop } from 'lodash';
import { useEffect } from 'react';
import { fetchLabels, getUserLabel } from 'reducers/users';
import { connect, PropTypes, React, styled } from 'utils/create';

const Container = styled.span`
  display: flex;
`;

const UserName = styled.span`
  margin-left: 0.5rem;
`;

const UserLabel = ({ className, handleFetchLabels, id, isLoading, simple, user }) => {
  useEffect(() => {
    if (!isLoading && user.isEmpty()) {
      handleFetchLabels(id);
    }
  }, [id]);

  return (
    <Container className={className}>
      <Spin key={id} size="small" spinning={user.isEmpty()}>
        <Avatar size="small" src={user.get('picture')} />
        {!simple && user.get('name') && <UserName>{user.get('name')}</UserName>}
      </Spin>
    </Container>
  );
};

UserLabel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleFetchLabels: PropTypes.func,
  isLoading: PropTypes.bool,
  simple: PropTypes.bool,
  user: PropTypes.map,
};

UserLabel.defaultProps = {
  className: '',
  handleFetchLabels: noop,
  isLoading: false,
  simple: false,
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
