import { Avatar, Spin } from 'antd';
import { get, isEmpty } from 'lodash';
import React, { FunctionComponent, useEffect } from 'react';
import { HandleThunkActionCreator, ResolveThunks } from 'react-redux';
import { ApplicationState } from 'reducers';
import { fetchLabels, getUserLabel } from 'reducers/users';
import { User } from 'types';
import { connect, styled } from 'utils/create';

interface OwnProps {
  id: string;
  className?: string;
  simple?: boolean;
}

interface StateProps {
  isLoading: boolean;
  user?: User;
}

interface DispatchProps {
  handleFetchLabels: typeof fetchLabels;
}

type Props = OwnProps & StateProps & ResolveThunks<DispatchProps>;

const Container = styled.span`
  display: flex;
`;

const UserName = styled.span`
  margin-left: 0.5rem;
`;

const UserLabel: FunctionComponent<Props> = ({
  className,
  handleFetchLabels,
  id,
  isLoading,
  simple,
  user,
}) => {
  useEffect(() => {
    if (!isLoading && isEmpty(user)) {
      handleFetchLabels(id);
    }
  }, [handleFetchLabels, id, isLoading, user]);

  return (
    // TODO check if className is required here
    <Container className={className}>
      <Spin key={id} size="small" spinning={isEmpty(user)}>
        <Avatar size="small" src={user && user.picture} />
        {!simple && user && user.name && <UserName>{user.name}</UserName>}
      </Spin>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState, { id }: OwnProps): StateProps => ({
  isLoading: get(state.loading, ['usersLabels', id]),
  user: getUserLabel(state, id),
});

const mapDispatchToProps: DispatchProps = {
  handleFetchLabels: fetchLabels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLabel);
