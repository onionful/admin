import { Avatar, Spin } from 'antd';
import { get, isEmpty } from 'lodash';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'reducers';
import { fetchLabels, getUserLabel } from 'reducers/users';
import { styled } from 'utils/create';

interface Props {
  id: string;
  className?: string;
  simple?: boolean;
}

const Container = styled.span`
  display: flex;
`;

const UserName = styled.span`
  margin-left: 0.5rem;
`;

const UserLabel: FunctionComponent<Props> = ({ className, id, simple }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: ApplicationState) =>
    get(state.loading, ['usersLabels', id]),
  );
  const user = useSelector((state: ApplicationState) => getUserLabel(state, id));

  console.log('isLoading', id, isLoading);

  useEffect(() => {
    if (!isLoading && isEmpty(user)) {
      dispatch(fetchLabels(id));
    }
  }, [dispatch, fetchLabels, id, isLoading, user]);

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

export default UserLabel;
