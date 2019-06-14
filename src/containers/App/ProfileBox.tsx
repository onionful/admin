import { Avatar, Tooltip } from 'antd';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationState } from 'reducers';
import { Profile } from 'types';
import { colors } from 'utils';
import { connect, styled } from 'utils/create';

interface OwnProps {
  collapsed: boolean;
}

interface StateProps {
  profile?: Profile;
}

type Props = OwnProps & StateProps;

const UserInfo = styled.div`
  cursor: pointer;
  background-color: ${colors.background};
  padding: 1rem 0;
  text-align: center;
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  div {
    color: ${colors.white};
    padding-top: 1rem;
    opacity: 0.65;
  }
`;

const ProfileBox: FunctionComponent<Props> = ({ collapsed, profile }) => {
  const profileName = profile ? profile.name || profile.nickname : '';

  return (
    <Link to="/profile">
      <Tooltip placement="right" title={profileName} trigger={collapsed ? 'hover' : undefined}>
        <UserInfo>
          {/* TODO use <UserLabel/> */}
          <Avatar size="large" src={profile && profile.picture} />
          {!collapsed && <div>{profileName}</div>}
        </UserInfo>
      </Tooltip>
    </Link>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(ProfileBox);
