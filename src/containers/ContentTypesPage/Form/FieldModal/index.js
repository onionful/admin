import { Button, Form, Modal } from 'antd';
import { ContentTypeIcon } from 'components';
import { types } from 'config';
import { entries, isEmpty, noop, upperFirst } from 'lodash';
import { Component, compose, glamorous, injectIntl, PropTypes, React } from 'utils/create';
import Attributes from '../Attributes';

const StyledButton = glamorous(Button)({
  display: 'flex',
  margin: '.5rem 0',
  padding: '.5rem',
  height: 'auto',
  width: '100%',
});

const BackButton = glamorous(Button)({
  float: 'left',
});

const Description = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  padding: '0 1rem',
});

class FieldModal extends Component {
  state = {
    field: {},
    type: undefined,
    errors: null,
    visible: false,
  };

  handleBack = () => {
    this.setState({ type: undefined });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    const {
      onSubmit,
      form: { validateFields },
    } = this.props;
    const { type } = this.state;

    validateFields((errors, values) => {
      if (errors) {
        this.setState({ errors });
      } else {
        this.setState({ errors, visible: false }, () => onSubmit({ ...values, type }));
      }
    });
  };

  handleTypeSelected = type => {
    this.setState({ type });
  };

  show = (field = {}) => {
    this.setState({ field, type: field.type, visible: true });
  };

  render() {
    const { field, type, errors, visible } = this.state;
    const {
      form,
      intl: { formatMessage },
    } = this.props;

    const showBackButton = type && isEmpty(field);

    return (
      <Modal
        title={formatMessage({ id: 'contentTypes.addField' }, { type })}
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          showBackButton && (
            <BackButton key="back" type="dashed" onClick={this.handleBack}>
              {formatMessage({ id: 'global.back' })}
            </BackButton>
          ),
          <Button key="cancel" onClick={this.handleCancel}>
            {formatMessage({ id: 'global.cancel' })}
          </Button>,
          <Button key="submit" disabled={!type} type="primary" onClick={this.handleSubmit}>
            {formatMessage({ id: 'global.save' })}
          </Button>,
        ]}
      >
        <Form hideRequiredMark>
          {!type &&
            entries(types).map(([fieldType]) => (
              <StyledButton key={fieldType} onClick={() => this.handleTypeSelected(fieldType)}>
                <ContentTypeIcon type={fieldType} />
                <Description>
                  <strong>{upperFirst(fieldType)}</strong>
                  <small>{formatMessage({ id: `contentTypes.types.${fieldType}` })}</small>
                </Description>
              </StyledButton>
            ))}

          {type && <Attributes type={type} form={form} errors={errors} />}
        </Form>
      </Modal>
    );
  }
}

FieldModal.propTypes = {
  form: PropTypes.form.isRequired,
  intl: PropTypes.intl.isRequired,
  onSubmit: PropTypes.func,
};

FieldModal.defaultProps = {
  onSubmit: noop,
};

export default compose(
  injectIntl,
  Form.create(),
)(FieldModal);
