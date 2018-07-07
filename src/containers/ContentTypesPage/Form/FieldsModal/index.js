import { Button, Modal } from 'antd';
import { ContentTypeIcon } from 'components';
import { types } from 'config';
import { entries, noop, upperFirst } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { Component, compose, glamorous, PropTypes, React } from 'utils/create';

const StyledButton = glamorous(Button)({
  display: 'flex',
  margin: '.5rem 0',
  padding: '.5rem',
  height: 'auto',
  width: '100%',
});

const Description = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  padding: '0 1rem',
});

class FieldsModal extends Component {
  state = {
    visible: false,
    type: null,
  };

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    this.setState({ visible: false });
  };

  handleTypeSelected = type => {
    this.setState({ type });
  };

  show = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible, type } = this.state;
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <Modal
        title={formatMessage({ id: 'contentTypes.addField' })}
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
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
