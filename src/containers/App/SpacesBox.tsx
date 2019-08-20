import {  setSpace, fetchSpacesList } from 'actions/spaces';
import { Icon, Tooltip } from 'antd';
import { SpacesModal } from 'components';
import { withLoading } from 'hocs';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Space } from 'types';
import { acronym, colors } from 'utils';
import { push, styled } from 'utils/create';

interface Props {
  collapsed: boolean;
  space?: Space;
}

const Text = styled.div`
  cursor: pointer;
  background-color: ${colors.background};
  border-top: 1px solid ${colors.black};
  color: ${colors.white};
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.5s, color 0.5s;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    color: ${colors.onion};
  },
`;

const NoSpaceIcon = styled(Icon)`
  color: ${colors.onion};
`;

const NoSpaceLabel = styled.div`
  color: ${colors.onion};
`;

const SpacesBox: FunctionComponent<Props> = ({ collapsed, space }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [spacesModalVisible, setSpacesModalVisible] = useState(false);

  const handleOnCreate = useCallback(() => {
    setSpacesModalVisible(false);
    dispatch(push('/spaces/create'));
  }, [dispatch]);
  const handleSetSpace = useCallback(
    (space: Space) => {
      setSpacesModalVisible(false);
      dispatch(setSpace(space));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchSpacesList());
  }, [dispatch]);

  const noSpaceLabel = <NoSpaceLabel>{t('spacesModal.notSelected')}</NoSpaceLabel>;

  return (
    <>
      <Tooltip
        placement="right"
        title={collapsed ? (space ? space.name : noSpaceLabel) : undefined}
        trigger={collapsed ? 'hover' : undefined}
      >
        <Text onClick={() => setSpacesModalVisible(true)}>
          {space ? (
            collapsed ? (
              acronym(space.name)
            ) : (
              space.name
            )
          ) : (
            <>
              <NoSpaceIcon type="warning" />
              {!collapsed && noSpaceLabel}
            </>
          )}
        </Text>
      </Tooltip>
      <SpacesModal
        visible={spacesModalVisible}
        onCreate={handleOnCreate}
        onSetSpace={handleSetSpace}
      />
    </>
  );
};

export default withLoading('profileFetch')(SpacesBox);
