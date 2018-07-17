import { Col, Input } from 'antd';
import { Lock } from 'components';
import { camelCase } from 'lodash';
import { Component, PropTypes, React } from 'utils/create';

export default class extends Component {
  static propTypes = {
    fieldDecorator: PropTypes.func.isRequired,
    setValues: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
    locked: true,
  };

  handleValueChange = ({ target: { value } }) => {
    const { setValues } = this.props;
    const { locked } = this.state;

    if (locked) {
      setValues({ id: camelCase(value) });
    }
  };

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  render() {
    const { fieldDecorator, type } = this.props;
    const { locked } = this.state;

    return (
      <Input.Group>
        <Col span={12}>
          {fieldDecorator('id')(
            <Input
              addonBefore="ID"
              disabled={locked}
              addonAfter={<Lock locked={locked} onLock={this.handleLock} />}
            />,
          )}
        </Col>
        <Col span={12}>{fieldDecorator(type)(<Input onChange={this.handleValueChange} />)}</Col>
      </Input.Group>
    );
  }
}
