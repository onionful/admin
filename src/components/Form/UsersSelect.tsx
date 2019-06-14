import { message, Select, Spin } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { UserLabel } from 'components';
import { withTranslate, WithTranslateProps } from 'hocs';
import { debounce, isEmpty } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ApplicationState } from 'reducers';
import { getUserId } from 'reducers/profile';
import { findUsers } from 'reducers/users';
import { User } from 'types';
import { compose, connect } from 'utils/create';

interface OwnProps {
  currentUserRequired: boolean;
  onChange: any;
  value: string[];
}

interface StateProps {
  currentUserId?: string;
}

type Props = OwnProps & StateProps & WithTranslateProps;

const UsersSelect: FunctionComponent<Props> = ({
  _,
  currentUserId,
  currentUserRequired,
  onChange,
  value = [],
}) => {
  const [data, setData] = useState<User[]>([]);
  const [fetching, setFetching] = useState(false);

  const handleSearch = debounce(searchValue => {
    setData([]);

    if (searchValue.trim().length >= 3) {
      setFetching(true);

      findUsers(searchValue).then(users => {
        setFetching(false);
        setData(users.map(user => ({ ...user, id: user.user_id })));
      });
    }
  }, 500);

  const handleChange = useCallback(
    (values: LabeledValue[] = []) => {
      if (
        currentUserRequired &&
        currentUserId &&
        values.findIndex(({ key }) => key === currentUserId) === -1
      ) {
        values.unshift({ key: currentUserId, label: <UserLabel id={currentUserId} /> });
      }

      onChange(values.map(({ key }) => key));
      setData([]);
      setFetching(false);
    },
    [currentUserId, currentUserRequired, onChange],
  );

  useEffect(() => {
    if (currentUserRequired && isEmpty(value)) {
      handleChange();
    }
  }, [currentUserRequired, handleChange, value]);

  const handleDeselect = ({ key }: LabeledValue = {} as LabeledValue) => {
    if (currentUserRequired && key === currentUserId) {
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
      value={value.map(id => ({ key: id, label: <UserLabel id={id} /> }))}
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

const mapStateToProps = (state: ApplicationState): StateProps => ({
  currentUserId: getUserId(state),
});

export default compose<FunctionComponent<OwnProps>>(
  withTranslate,
  connect(mapStateToProps),
)(UsersSelect);
