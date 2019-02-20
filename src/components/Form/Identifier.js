import { Col, Form, Icon, Input, Row, Tooltip } from 'antd';
import { Lock } from 'components';
import { withTranslate } from 'hocs';
import { get, isEmpty, kebabCase, zipObject } from 'lodash';
import React, { useState } from 'react';
import { compose, connect, PropTypes, styled } from 'utils/create';

const NoAutoGenerateIcon = styled(({ className, tooltip }) => (
  <Tooltip title={tooltip}>
    <Icon className={className} type="disconnect" />
  </Tooltip>
))`
  margin-right: 1rem;
`;

const Identifier = ({ _, _fields, autoGenerateId, normalize }) => {
  const [locked, setLocked] = useState(
    isEmpty(_fields.id.input.value) ||
      _fields.id.input.value === normalize(_fields.value.input.value),
  );

  const handleIdChange = ({ target: { value } }) => _fields.id.input.onChange(normalize(value));

  const handleValueBlur = ({ target: { value } }) => _fields.value.input.onChange(value.trim());

  const handleValueChange = ({ target: { value } }) => {
    _fields.value.input.onChange(value);
    if (locked && autoGenerateId) {
      _fields.id.input.onChange(normalize(value));
    }
  };

  const handleLock = () => {
    if (!locked) {
      _fields.id.input.onChange(normalize(_fields.value.input.value));
    }
    setLocked(!locked);
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label={_('global.name')}>
          <Input
            {..._fields.value.input}
            name={_fields.value.name}
            onBlur={handleValueBlur}
            onChange={handleValueChange}
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
                <Lock locked={locked} onLock={handleLock} />
              </div>
            }
            disabled={locked}
            name={_fields.id.name}
            onChange={handleIdChange}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

const FieldShape = PropTypes.shape({
  name: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.input.onChange,
    value: PropTypes.input.value,
  }),
});

Identifier.propTypes = {
  _: PropTypes.func.isRequired,
  _fields: PropTypes.shape({
    id: FieldShape,
    value: FieldShape,
  }),
  autoGenerateId: PropTypes.bool,
  normalize: PropTypes.func,
};

Identifier.defaultProps = {
  _fields: { id: { name: '', input: { value: '' } }, value: { name: '', input: { value: '' } } },
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
