import { Button, Form, Modal } from 'antd';
import { FieldTypeIcon } from 'components';
import { types } from 'config/index';
import { withTranslate } from 'helpers/index';
import { entries, forEach, isEmpty, mapValues, noop, upperFirst } from 'lodash';
import { Component, compose, PropTypes, React, styled } from 'utils/create';
import FieldType from './FieldType';

const StyledButton = styled(Button)({
  display: 'flex',
  margin: '.5rem 0',
  padding: '.5rem',
  height: 'auto',
  width: '100%',
});

const BackButton = styled(Button)({
  float: 'left',
});

const Description = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  padding: '0 1rem',
});

class FieldModal extends Component {
  state = {
    field: {},
    type: undefined,
    id: undefined,
    errors: null,
    visible: false,
  };

  getChildContext() {
    const { _, collection } = this.props;
    const { field } = this.state;
    const conflictMessage = _('errors.nameTaken');

    return {
      idValidator: key => (rule, value, cb) => {
        const reserved = []
          .concat(
            ...collection.keySeq(),
            ...collection.get('fields').map(f => [f.get('id'), f.get('identifier')]),
          )
          .filter(v => v && v !== field[key]);

        console.log('reserved.includes(value)', reserved.includes(value));
        cb(...(reserved.includes(value) ? [conflictMessage] : []));
      },
      identifierValidator: (first, second) => (rule, value, cb) => {
        const { form } = this.props;
        const values = form.getFieldsValue([first, second]);

        cb(...(values[first] === values[second] ? [conflictMessage] : []));
      },
    };
  }

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

    this.setState({ field, type: field.type, id: field.id, visible: true });

    const values = Object.assign(mapValues(form.getFieldsValue(), noop), field);
    forEach(values, (initialValue, key) => form.getFieldDecorator(key, { initialValue }));
    form.resetFields();
  };

  render() {
    const { _, form } = this.props;
    const { field, type, id, errors, visible } = this.state;

    const showBackButton = type && isEmpty(field);

    return (
      <Modal
        title={_('collections.addField', { type })}
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
        {!type &&
          entries(types).map(([fieldType]) => (
            <StyledButton key={fieldType} onClick={() => this.handleTypeSelected(fieldType)}>
              <FieldTypeIcon type={fieldType} />
              <Description>
                <strong>{upperFirst(fieldType)}</strong>
                <small>{_(`collections.types.${fieldType}`)}</small>
              </Description>
            </StyledButton>
          ))}

        {type && (
          <Form hideRequiredMark>
            <FieldType type={type} id={id} form={form} errors={errors} />
          </Form>
        )}
      </Modal>
    );
  }
}

FieldModal.propTypes = {
  _: PropTypes.func.isRequired,
  collection: PropTypes.map.isRequired,
  form: PropTypes.form.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FieldModal.childContextTypes = {
  idValidator: PropTypes.func,
  identifierValidator: PropTypes.func,
};

export default compose(
  withTranslate,
  Form.create(),
)(FieldModal);
