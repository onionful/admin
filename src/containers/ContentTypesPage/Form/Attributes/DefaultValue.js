import { Input } from 'antd';
import { Component, PropTypes, React } from 'utils/create';

export default class extends Component {
  static propTypes = {
    fieldDecorator: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { fieldDecorator, type } = this.props;
    return fieldDecorator(type)(<Input />);
  }
}
