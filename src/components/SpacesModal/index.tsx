import { Button, List, Modal } from 'antd';
import { Logo } from 'components';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'reducers';
import { getCurrentSpace } from 'reducers/spaces';
import { Space } from 'types';
import { colors } from 'utils';
import { styled } from 'utils/create';

interface Props {
  onCreate: () => void;
  onSetSpace: (space: Space) => void;
  visible: boolean;
}

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

  &:hover,
  &.selected {
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

const SpacesModal: FunctionComponent<Props> = ({ onCreate, onSetSpace, visible }) => {
  const { t } = useTranslation();
  const spaces = useSelector((state: ApplicationState) => Object.values(state.spaces.data));
  const current = useSelector(getCurrentSpace);

  return (
    <Modal
      bodyStyle={{ backgroundColor: colors.background, color: colors.white }}
      closable={false}
      footer={null}
      visible={visible}
    >
      <StyledLogo />
      <Header>{t('spacesModal.select')}</Header>
      <List
        bordered
        dataSource={spaces}
        locale={{ emptyText: <EmptyText>{t('spacesModal.noData')}</EmptyText> }}
        renderItem={(item: Space) => (
          <Item
            className={item === current ? 'selected' : undefined}
            onClick={() => onSetSpace(item)}
          >
            {item.name}
          </Item>
        )}
      />
      <CreateSpace>
        <Button ghost icon="rocket" onClick={onCreate}>
          {t('spacesModal.create')}
        </Button>
      </CreateSpace>
    </Modal>
  );
};

export default SpacesModal;
