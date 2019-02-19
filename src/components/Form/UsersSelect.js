import { message, Select, Spin } from 'antd';
import { UserLabel } from 'components';
import { withTranslate } from 'hocs';
import { fromJS, List } from 'immutable';
import { debounce, noop } from 'lodash';
import { getId } from 'reducers/auth';
import { findUsers } from 'reducers/users';
import { Component, compose, connect, PropTypes, React } from 'utils/create';

class UsersSelect extends Component {
  state = {
    data: [],
    fetching: false,
  };

  constructor(...args) {
    super(...args);

    this.lastFetchId = 0;
    this.handleSearch = debounce(this.handleSearch, 500);
  }

  componentDidMount() {
    const { currentUserRequired, value } = this.props;

    if (currentUserRequired && value.isEmpty()) {
      this.handleChange();
    }
  }

  handleChange = async (values = []) => {
    const { currentUser, currentUserRequired, onChange } = this.props;

    if (currentUserRequired && values.findIndex(({ key }) => key === currentUser) === -1) {
      values.unshift({ key: currentUser, label: <UserLabel id={currentUser} /> });
    }

    onChange(fromJS(values.map(({ key }) => key)));

    this.setState({
      data: [],
      fetching: false,
    });
  };

  handleDeselect = ({ key }) => {
    const { _, currentUser, currentUserRequired } = this.props;
    if (currentUserRequired && key === currentUser) {
      message.warning(_('messages.spaces.currentUserRequired'));
    }
  };

  handleSearch = value => {
    if (value.trim().length < 3) {
      return;
    }

    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });

    findUsers(value).then(({ data: { users } }) => {
      if (fetchId !== this.lastFetchId) {
        return;
      }

      this.setState({
        fetching: false,
        data: users.map(user => ({ ...user, id: user.user_id })),
      });
    });
  };

  render() {
    const { _, value } = this.props;
    const { fetching, data } = this.state;

    return (
      <Select
        labelInValue
        filterOption={false}
        mode="multiple"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        placeholder={_('global.selectUsers')}
        value={value.toArray().map(id => ({ key: id, label: <UserLabel id={id} /> }))}
        onChange={this.handleChange}
        onDeselect={this.handleDeselect}
        onSearch={this.handleSearch}
      >
        {data.map(({ id }) => (
          <Select.Option key={id}>
            <UserLabel id={id} />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

UsersSelect.propTypes = {
  _: PropTypes.func.isRequired,
  currentUser: PropTypes.string,
  currentUserRequired: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.list,
};

UsersSelect.defaultProps = {
  currentUser: null,
  currentUserRequired: false,
  onChange: noop,
  value: List(),
};

const mapStateToProps = state => ({
  currentUser: getId(state),
});

export default compose(
  connect(mapStateToProps),
  withTranslate,
)(UsersSelect);
