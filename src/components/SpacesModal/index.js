import { List, Modal } from 'antd';
import { Logo } from 'components';
import { List as IList } from 'immutable';
import { noop } from 'lodash';
import { fetchSpaces, setSpace } from 'reducers/spaces/actions';
import { colors } from 'utils';
import { Component, connect, glamorous, PropTypes, React } from 'utils/create';

const StyledLogo = glamorous(Logo)({
  display: 'block',
  margin: '0 auto',
  width: '10rem',
});

const Header = glamorous.h1({
  textAlign: 'center',
  margin: '2rem',
  color: colors.white,
});

const Item = glamorous(List.Item)({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: colors.white,
  fontSize: '1.2rem',

  '&:hover': {
    background: colors.onion,
    color: colors.black,
  },
});

class SpacesModal extends Component {
  componentDidMount() {
    const { handleFetchSpaces } = this.props;
    handleFetchSpaces();
  }

  onItemClick = value => {
    const { handleSetSpace } = this.props;
    handleSetSpace(value);
  };

  render() {
    const { isLoading, spaces } = this.props;

    return (
      <Modal
        visible
        closable={false}
        footer={null}
        bodyStyle={{ backgroundColor: colors.background, color: colors.white }}
      >
        <StyledLogo />
        <Header>Select your current space</Header>
        <List
          bordered
          loading={isLoading}
          dataSource={spaces}
          renderItem={item => (
            <Item onClick={() => this.onItemClick(item.get('id'))}>{item.get('name')}</Item>
          )}
        />
      </Modal>
    );
  }
}

SpacesModal.propTypes = {
  spaces: PropTypes.list,
  isLoading: PropTypes.bool,
  handleFetchSpaces: PropTypes.func,
  handleSetSpace: PropTypes.func,
};

SpacesModal.defaultProps = {
  spaces: IList(),
  isLoading: true,
  handleFetchSpaces: noop,
  handleSetSpace: noop,
};

const mapStateToProps = state => ({
  space: state.getIn(['spaces', 'current']),
  spaces: state.getIn(['spaces', 'data']),
  isLoading: state.getIn(['spaces', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchSpaces: params => dispatch(fetchSpaces(params)),
  handleSetSpace: space => dispatch(setSpace(space)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpacesModal);
