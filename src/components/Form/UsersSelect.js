import { message, Select, Spin } from 'antd';
import { UserLabel } from 'components';
import { withTranslate } from 'hocs';
import { fromJS, List } from 'immutable';
import { debounce, noop } from 'lodash';
import { useEffect, useState } from 'react';
import { getId } from 'reducers/auth';
import { findUsers } from 'reducers/users';
import { compose, connect, PropTypes, React } from 'utils/create';

const UsersSelect = ({ _, currentUser, currentUserRequired, onChange, value }) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleSearch = debounce(searchValue => {
    setData([]);

    if (searchValue.trim().length >= 3) {
      setFetching(true);

      findUsers(searchValue).then(({ data: { users } }) => {
        setFetching(false);
        setData(users.map(user => ({ ...user, id: user.user_id })));
      });
    }
  }, 500);

  const handleChange = (values = []) => {
    if (currentUserRequired && values.findIndex(({ key }) => key === currentUser) === -1) {
      values.unshift({ key: currentUser, label: <UserLabel id={currentUser} /> });
    }

    onChange(fromJS(values.map(({ key }) => key)));
    setData([]);
    setFetching(false);
  };

  useEffect(() => {
    if (currentUserRequired && value.isEmpty()) {
      handleChange();
    }
  }, [currentUserRequired, value]);

  const handleDeselect = ({ key }) => {
    if (currentUserRequired && key === currentUser) {
      message.warning(_('messages.spaces.currentUserRequired'));
    }
  };

  return (
    <Select
      labelInValue
      filterOption={false}
      mode="multiple"
      notFoundContent={fetching ? <Spin size="small" /> : null}
      placeholder={_('global.selectUsers')}
      value={value.toArray().map(id => ({ key: id, label: <UserLabel id={id} /> }))}
      onChange={handleChange}
      onDeselect={handleDeselect}
      onSearch={handleSearch}
    >
      {data.map(({ id }) => (
        <Select.Option key={id}>
          <UserLabel id={id} />
        </Select.Option>
      ))}
    </Select>
  );
};

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
