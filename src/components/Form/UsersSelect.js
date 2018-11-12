import { Form, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import { findUsers } from 'reducers/users/actions';
import { Component, PropTypes, React } from 'utils/create';

// const UserName = styled.span({ marginLeft: '0.5rem' });

class UsersSelect extends Component {
  constructor(...args) {
    super(...args);

    this.lastFetchId = 0;
    this.handleSearch = debounce(this.handleSearch, 500);
  }

  state = {
    data: [],
    fetching: false,
  };

  handleChange = () => {
    this.setState({
      data: [],
      fetching: false,
    });
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
        data: users.map(user => ({
          text: user.name,
          value: user.user_id,
          picture: user.picture,
        })),
      });
    });
  };

  render() {
    const { form, id, label } = this.props;
    const { fetching, data } = this.state;

    return (
      <Form.Item label={label}>
        {form.getFieldDecorator(id)(
          <Select
            labelInValue
            filterOption={false}
            mode="multiple"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            placeholder="Select users"
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          >
            {data.map(d => (
              <Select.Option key={d.value}>
                {d.text}
                {/* <Avatar size="small" src={d.picture} /> */}
                {/* <UserName>{d.text}</UserName> */}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  }
}

UsersSelect.propTypes = {
  form: PropTypes.form.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default UsersSelect;
