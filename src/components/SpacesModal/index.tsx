import { Button, List, Modal } from 'antd';
import { Logo } from 'components';
import { WithTranslateProps, withTranslate } from 'hocs';
import React, { FunctionComponent } from 'react';
import { ApplicationState } from 'reducers';
import { Space } from 'types';
import { colors } from 'utils';
import { compose, connect, styled } from 'utils/create';

interface OwnProps {
  onCreate: () => void;
  onSetSpace: (spaceId: string) => void;
  visible: boolean;
}

interface StateProps {
  spaces: Space[];
}

type Props = OwnProps & StateProps & WithTranslateProps;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto;
  width: 10rem;
`;

const Header = styled.h1`
  text-align: center;
  margin: 2rem;
  color: ${colors.white};
`;

const Item = styled(List.Item)`
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${colors.white};
  font-size: 1.2rem;

  &:hover {
    background: ${colors.onion};
    color: ${colors.black};
  }
`;

const CreateSpace = styled.div`
  display: block;
  margin: 2rem 0 1rem;
  text-align: center;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

const EmptyText = styled.span`
  color: ${colors.white};
  font-style: italic;
`;

const SpacesModal: FunctionComponent<Props> = ({ _, onCreate, onSetSpace, spaces, visible }) => (
  <Modal
    bodyStyle={{ backgroundColor: colors.background, color: colors.white }}
    closable={false}
    footer={null}
    visible={visible}
  >
    <StyledLogo />
    <Header>{_('spacesModal.select')}</Header>
    <List
      bordered
      dataSource={spaces}
      locale={{ emptyText: <EmptyText>{_('spacesModal.noData')}</EmptyText> }}
      renderItem={(item: Space) => <Item onClick={() => onSetSpace(item.id)}>{item.name}</Item>}
    />
    <CreateSpace>
      <Button ghost icon="rocket" onClick={onCreate}>
        {_('spacesModal.create')}
      </Button>
    </CreateSpace>
  </Modal>
);

const mapStateToProps = (state: ApplicationState): StateProps => ({
  spaces: Object.values(state.spaces.data),
});

export default compose<FunctionComponent<OwnProps>>(
  withTranslate,
  connect(mapStateToProps),
)(SpacesModal);
