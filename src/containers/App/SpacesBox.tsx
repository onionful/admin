import { Icon, Tooltip } from 'antd';
import { SpacesModal } from 'components';
import { WithTranslateProps, withTranslate } from 'hocs';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { ResolveThunks } from 'react-redux';
import { ApplicationState } from 'reducers';
import { getCurrentSpace } from 'reducers/spaces';
import { Space } from 'types';
import { acronym, colors } from 'utils';
import { compose, connect, push, styled } from 'utils/create';

interface OwnProps {
  collapsed: boolean;
}

interface StateProps {
  space?: Space;
}

interface DispatchProps {
  handlePush: typeof push;
}

type Props = OwnProps & StateProps & ResolveThunks<DispatchProps> & WithTranslateProps;

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

const SpacesBox: FunctionComponent<Props> = ({ _, collapsed, handlePush, space }) => {
  const [spacesModalVisible, setSpacesModalVisible] = useState(space === undefined);
  const noSpaceLabel = <NoSpaceLabel>{_('spacesModal.notSelected')}</NoSpaceLabel>;

  return (
    <Fragment>
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
            <Fragment>
              <NoSpaceIcon type="warning" />
              {!collapsed && noSpaceLabel}
            </Fragment>
          )}
        </Text>
      </Tooltip>
      <SpacesModal
        visible={spacesModalVisible}
        onCreate={() => {
          setSpacesModalVisible(false);
          handlePush('/spaces/create');
        }}
        // TODO test onSetSpace
        onSetSpace={(spaceId: string) => {
          setSpacesModalVisible(false);
          // handleSetSpace(spaceId);
        }}
      />
    </Fragment>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => ({
  space: getCurrentSpace(state),
});

const mapDispatchToProps: DispatchProps = {
  handlePush: push,
};

export default compose<FunctionComponent<OwnProps>>(
  withTranslate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SpacesBox);
