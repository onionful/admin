import { Col, Form, Icon, Input, Row, Tooltip } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'hocs';
import { isEmpty, kebabCase, noop } from 'lodash';
import { Component, compose, PropTypes, React, styled } from 'utils/create';

const NoAutoGenerateIcon = styled(({ className, tooltip }) => (
  <Tooltip title={tooltip}>
    <Icon className={className} type="disconnect" />
  </Tooltip>
))`
  margin-right: 1rem;
`;

class InputWithId extends Component {
  constructor(...args) {
    super(...args);

    const { form, idKey, normalize, valueKey } = this.props;
    const id = form.getFieldValue(idKey);
    const value = normalize(form.getFieldValue(valueKey));

    this.state = { locked: isEmpty(id) || value === id };
  }

  handleValueChange = ({ target: { value } }) => {
    const { autoGenerateId, form, idKey } = this.props;
    const { locked } = this.state;

    if (autoGenerateId && locked) {
      form.setFieldsValue({ [idKey]: value });
    }
  };

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  render() {
    const { _, autoGenerateId, form, idKey, idLabel, normalize, valueKey, valueLabel } = this.props;
    const { idValidator = noop } = this.context;
    const { locked } = this.state;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={valueLabel}>
            {form.getFieldDecorator(valueKey, {
              rules: [{ required: true }],
            })(<Input onChange={this.handleValueChange} />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={idLabel}>
            <Tooltip title={locked ? '' : _('components.inputWithId.idTooltip')}>
              {form.getFieldDecorator(idKey, {
                normalize,
                rules: [{ required: true }, { validator: idValidator(idKey) }],
              })(
                <Input
                  addonAfter={
                    <div>
                      {!autoGenerateId && locked && (
                        <NoAutoGenerateIcon tooltip={_('components.inputWithId.noAutoGenerator')} />
                      )}
                      <Lock locked={locked} onLock={this.handleLock} />
                    </div>
                  }
                  disabled={locked}
                />,
              )}
            </Tooltip>
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

InputWithId.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  idKey: PropTypes.string.isRequired,
  idLabel: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  valueLabel: PropTypes.string.isRequired,
  autoGenerateId: PropTypes.bool,
  normalize: PropTypes.func,
};

InputWithId.defaultProps = {
  autoGenerateId: true,
  normalize: kebabCase,
};

InputWithId.contextTypes = {
  idValidator: PropTypes.func,
};

export default compose(withTranslate)(InputWithId);
