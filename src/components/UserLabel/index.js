import { Avatar, Spin } from 'antd';
import { Map } from 'immutable';
import { getUserLabel } from 'reducers/users/actions';
import { connect, PropTypes, React, styled } from 'utils/create';

const UserName = styled.span({ marginLeft: '0.5rem' });

const UserLabel = ({ id, user }) => (
  <Spin key={id} size="small" spinning={user.isEmpty()}>
    <Avatar size="small" src={user.get('picture')} />
    {user.get('name') && <UserName>{user.get('name')}</UserName>}
  </Spin>
);

UserLabel.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.map,
};

UserLabel.defaultProps = {
  user: Map(),
};

const mapStateToProps = (state, { id }) => ({
  user: getUserLabel(state, id),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLabel);
