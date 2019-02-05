import { Button, Modal } from 'antd';
import { FieldTypeIcon } from 'components';
import { types } from 'config';
import { withForm, withTranslate } from 'helpers';
import { Map } from 'immutable';
import { entries, upperFirst } from 'lodash';
import { Field, formValueSelector } from 'redux-form/immutable';
import { Component, compose, connect, PropTypes, React, styled } from 'utils/create';
import FieldType from './FieldType';

const StyledButton = styled(Button)`
  display: flex;
  margin: 0.5rem 0;
  padding: 0.5rem;
  height: auto;
  width: 100%;
`;

const BackButton = styled(Button)`
  float: left;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 1rem;
`;

class FieldModal extends Component {
  handleTypeSelected = type => {
    const { change } = this.props;

    change('type', type);
  };

  render() {
    const { _, handleSubmit, field, onCancel, onSubmit, type, visible } = this.props;

    const showBackButton = type && field.isEmpty();

    return (
      <Modal
        footer={[
          showBackButton && (
            <BackButton key="back" type="dashed" onClick={() => this.handleTypeSelected(null)}>
              {_('global.back')}
            </BackButton>
          ),
          <Button key="cancel" htmlType="button" onClick={onCancel}>
            {_('global.cancel')}
          </Button>,
          <Button
            key="submit"
            disabled={!type}
            htmlType="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {_('global.save')}
          </Button>,
        ]}
        title={_('collections.addField', { type })}
        visible={visible}
        onCancel={onCancel}
      >
        <Field component="input" name="type" type="hidden" value={type} />

        {type ? (
          <FieldType field={field} type={type} />
        ) : (
          entries(types)
            .filter(([, { singleton }]) => !singleton)
            .map(([fieldType]) => (
              <StyledButton key={fieldType} onClick={() => this.handleTypeSelected(fieldType)}>
                <FieldTypeIcon type={fieldType} />
                <Description>
                  <strong>{upperFirst(fieldType)}</strong>
                  <small>{_(`collections.types.${fieldType}`)}</small>
                </Description>
              </StyledButton>
            ))
        )}
      </Modal>
    );
  }
}

FieldModal.propTypes = {
  ...PropTypes.form,
  _: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  field: PropTypes.map,
  type: PropTypes.string,
};

FieldModal.defaultProps = {
  field: Map(),
  type: null,
};

const selector = formValueSelector('fieldModal');

const mapStateToProps = (state, { field }) => ({
  initialValues: field,
  type: selector(state, 'type'),
});

export default compose(
  connect(mapStateToProps),
  withTranslate,
  withForm('fieldModal', { enableReinitialize: true }),
)(FieldModal);
