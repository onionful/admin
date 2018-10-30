import { Col, Form, Icon, Input, Row, Tooltip } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'helpers';
import { isEmpty, kebabCase } from 'lodash';
import { Component, compose, PropTypes, React, styled } from 'utils/create';

const NoAutoGenerateIcon = styled(({ className, tooltip }) => (
  <Tooltip title={tooltip}>
    <Icon type="disconnect" className={className} />
  </Tooltip>
))({
  marginRight: '1rem',
});

class InputWithId extends Component {
  constructor(...args) {
    super(...args);

    const { form, idKey, valueKey } = this.props;
    const id = form.getFieldValue(idKey);
    const value = kebabCase(form.getFieldValue(valueKey));

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
    const { _, autoGenerateId, form, idKey, idLabel, valueKey, valueLabel } = this.props;
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
                rules: [{ required: true }],
                normalize: kebabCase,
              })(
                <Input
                  addonAfter={
                    <div>
                      {!autoGenerateId &&
                        locked && (
                          <NoAutoGenerateIcon
                            tooltip={_('components.inputWithId.noAutoGenerator')}
                          />
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
};

InputWithId.defaultProps = {
  autoGenerateId: true,
};

export default compose(withTranslate)(InputWithId);
