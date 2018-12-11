import { Button, List, Modal } from 'antd';
import Logo from 'components/Logo';
import { withLoading, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { fetchSpaces } from 'reducers/spaces/actions';
import { colors } from 'utils';
import { compose, connect, PropTypes, React, styled } from 'utils/create';

const StyledLogo = styled(Logo)({
  display: 'block',
  margin: '0 auto',
  width: '10rem',
});

const Header = styled.h1({
  textAlign: 'center',
  margin: '2rem',
  color: colors.white,
});

const Item = styled(List.Item)({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: colors.white,
  fontSize: '1.2rem',

  '&:hover': {
    background: colors.onion,
    color: colors.black,
  },
});

const EmptyText = styled.span({ color: colors.white });

const CreateSpace = styled(Button)({
  display: 'block',
  margin: '1rem auto',
  opacity: 0.1,

  '&:hover': {
    opacity: 1,
  },
});

const SpacesModal = ({ _, isLoading, onCreate, onSetSpace, spaces, visible }) => (
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
      dataSource={spaces.toList()}
      loading={isLoading}
      locale={{ emptyText: <EmptyText>{_('spacesModal.noData')}</EmptyText> }}
      renderItem={item => (
        <Item onClick={() => onSetSpace(item.get('id'))}>{item.get('name')}</Item>
      )}
    />
    <CreateSpace ghost icon="rocket" onClick={onCreate}>
      {_('spacesModal.create')}
    </CreateSpace>
  </Modal>
);

SpacesModal.propTypes = {
  _: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onSetSpace: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  spaces: PropTypes.map,
};

SpacesModal.defaultProps = {
  spaces: Map(),
};

const mapStateToProps = state => ({
  space: state.getIn(['spaces', 'current']),
  spaces: state.getIn(['spaces', 'data']),
});

export default compose(
  connect(mapStateToProps),
  withLoading({
    type: 'spacesList',
    action: () => fetchSpaces(),
    showSpinner: false,
  }),
  withTranslate,
)(SpacesModal);
