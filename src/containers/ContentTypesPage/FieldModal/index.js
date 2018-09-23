import { Button, Form, Modal } from 'antd';
import { ContentTypeIcon } from 'components/index';
import { types } from 'config/index';
import { withTranslate } from 'helpers/index';
import { entries, isEmpty, forEach, upperFirst } from 'lodash';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';
import Attributes from './Attributes';

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

class Index extends Component {
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
    const { onSubmit, form } = this.props;
    const { type } = this.state;

    form.validateFields((errors, values) => {
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
    const { form } = this.props;

    this.setState({ field, type: field.type, visible: true });
    forEach(field, (initialValue, key) => form.getFieldDecorator(key, { initialValue }));
  };

  render() {
    const { field, type, errors, visible } = this.state;
    const { _, form } = this.props;

    const showBackButton = type && isEmpty(field);

    return (
      <Modal
        title={_('contentTypes.addField', { type })}
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          showBackButton && (
            <BackButton key="back" type="dashed" onClick={this.handleBack}>
              {_('global.back')}
            </BackButton>
          ),
          <Button key="cancel" onClick={this.handleCancel}>
            {_('global.cancel')}
          </Button>,
          <Button key="submit" disabled={!type} type="primary" onClick={this.handleSubmit}>
            {_('global.save')}
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
                  <small>{_(`contentTypes.types.${fieldType}`)}</small>
                </Description>
              </StyledButton>
            ))}

          {type && <Attributes type={type} form={form} errors={errors} />}
        </Form>
      </Modal>
    );
  }
}

Index.propTypes = {
  _: PropTypes.func.isRequired,
  form: PropTypes.form.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  withTranslate,
  Form.create(),
)(Index);