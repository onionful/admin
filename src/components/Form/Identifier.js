import { Col, Form, Icon, Input, Row, Tooltip } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'helpers';
import { get, isEmpty, kebabCase, zipObject } from 'lodash';
import { Component, compose, connect, PropTypes, React, styled } from 'utils/create';

const NoAutoGenerateIcon = styled(({ className, tooltip }) => (
  <Tooltip title={tooltip}>
    <Icon className={className} type="disconnect" />
  </Tooltip>
))({ marginRight: '1rem' });

class Identifier extends Component {
  constructor(...args) {
    super(...args);

    const { _fields, normalize } = this.props;

    this.state = {
      locked:
        isEmpty(_fields.id.input.value) ||
        _fields.id.input.value === normalize(_fields.value.input.value),
    };
  }

  handleIdChange = ({ target: { value } }) => {
    const { _fields, normalize } = this.props;

    _fields.id.input.onChange(normalize(value));
  };

  handleValueChange = ({ target: { value } }) => {
    const { _fields, autoGenerateId, normalize } = this.props;
    const { locked } = this.state;

    _fields.value.input.onChange(value);
    if (locked && autoGenerateId) {
      _fields.id.input.onChange(normalize(value));
    }
  };

  handleLock = () => {
    const { _fields, normalize } = this.props;

    this.setState(
      ({ locked }) => ({ locked: !locked }),
      () => {
        const { locked } = this.state;
        if (locked) {
          _fields.id.input.onChange(normalize(_fields.value.input.value));
        }
      },
    );
  };

  render() {
    const { _, autoGenerateId, _fields } = this.props;
    const { locked } = this.state;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={_('global.name')}>
            <Input
              {..._fields.value.input}
              name={_fields.value.name}
              onChange={this.handleValueChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={_('global.id')}>
            <Input
              {..._fields.id.input}
              addonAfter={
                <div>
                  {!autoGenerateId && locked && (
                    <NoAutoGenerateIcon tooltip={_('components.identifier.noAutoGenerator')} />
                  )}
                  <Lock locked={locked} onLock={this.handleLock} />
                </div>
              }
              disabled={locked}
              name={_fields.id.name}
              onChange={this.handleIdChange}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

Identifier.propTypes = {
  _: PropTypes.func.isRequired,
  autoGenerateId: PropTypes.bool,
  normalize: PropTypes.func,
};

Identifier.defaultProps = {
  autoGenerateId: true,
  normalize: kebabCase,
};

const mapStateToProps = (state, props) => ({
  _fields: zipObject(['value', 'id'], props.names.map(name => ({ name, ...get(props, name) }))),
});

export default compose(
  connect(mapStateToProps),
  withTranslate,
)(Identifier);
