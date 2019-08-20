import { message, Select, Spin } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { UserLabel } from 'components';
import { debounce, isEmpty } from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserId } from 'reducers/profile';
import { findUsers } from 'reducers/users';
import { User } from 'types';

interface Props {
  currentUserRequired: boolean;
  onChange: any;
  value: string[];
}

const UsersSelect: FunctionComponent<Props> = ({ currentUserRequired, onChange, value = [] }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<User[]>([]);
  const [fetching, setFetching] = useState(false);
  const currentUserId = useSelector(getUserId);

  const handleSearch = useCallback(
    debounce(searchValue => {
      setData([]);

      if (searchValue.trim().length >= 3) {
        setFetching(true);

        findUsers(searchValue).then(users => {
          setFetching(false);
          setData(users.map(user => ({ ...user, id: user.user_id })));
        });
      }
    }, 500),
    [],
  );

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
      // handleChange();
    }
  }, [currentUserRequired, handleChange, value]);

  const handleDeselect = useCallback(
    ({ key }: LabeledValue = {} as LabeledValue) => {
      if (currentUserRequired && key === currentUserId) {
        message.warning(t('messages.spaces.currentUserRequired'));
      }
    },
    [currentUserRequired, currentUserId, t],
  );

  return (
    <Select
      labelInValue
      filterOption={false}
      mode="multiple"
      notFoundContent={fetching ? <Spin size="small" /> : null}
      placeholder={t('global.selectUsers')}
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

export default UsersSelect;
