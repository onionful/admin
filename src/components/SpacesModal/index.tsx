import { Button, List, Modal } from 'antd';
import { ListLocale } from 'antd/es/list';
import { Logo } from 'components';
import { IWithTranslate, withTranslate } from 'hocs';
import React, { FunctionComponent } from 'react';
import { ApplicationState } from 'reducers';
import { Space } from 'types';
import { colors } from 'utils';
import { compose, connect, styled } from 'utils/create';

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

const EmptyText = styled.span`
  color: ${colors.white};
`;

const CreateSpace = styled.div`
  display: block;
  margin: 1rem auto;
  opacity: 0.1;

  &:hover {
    opacity: 1;
  }
`;

interface OwnProps {
  onCreate: () => void;
  onSetSpace: (spaceId: string) => void;
  visible: boolean;
}

const StyledButton = styled(Button)``;

interface StateProps {
  space?: string;
  spaces: Space[];
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps & IWithTranslate;

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
      locale={{ emptyText: _('spacesModal.noData') } as ListLocale}
      renderItem={(item: Space) => <Item onClick={() => onSetSpace(item.id)}>{item.name}</Item>}
    />
    <CreateSpace>
      <Button ghost icon="rocket" onClick={onCreate}>
        {_('spacesModal.create')}
      </Button>
    </CreateSpace>
  </Modal>
);

SpacesModal.defaultProps = {
  spaces: [],
};

const mapStateToProps = (state: ApplicationState) => ({
  space: state.spaces.current,
  spaces: Object.values(state.spaces.data),
});

const mapDispatchToProps = {};

export default compose<FunctionComponent<OwnProps>>(
  connect<StateProps, any, OwnProps, ApplicationState>(mapStateToProps),
  withTranslate,
)(SpacesModal);
