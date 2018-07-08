import { Button, Modal } from 'antd';
import { ContentTypeIcon } from 'components';
import { types } from 'config';
import { entries, isEmpty, noop, upperFirst } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';
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

class FieldsModal extends Component {
  state = {
    field: {},
    type: undefined,
    visible: false,
  };

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  handleBack = () => {
    this.setState({ type: undefined });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    this.setState({ visible: false });
  };

  handleTypeSelected = type => {
    this.setState({ type });
  };

  show = (field = {}) => {
    this.setState({ field, type: field.type, visible: true });
  };

  render() {
    const { field, type, visible } = this.state;
    const {
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

        {type && <Attributes type={type} />}
      </Modal>
    );
  }
}

FieldsModal.propTypes = {
  intl: intlShape.isRequired,
  onRef: PropTypes.func,
};

FieldsModal.defaultProps = {
  onRef: noop,
};

export default compose(injectIntl)(FieldsModal);
