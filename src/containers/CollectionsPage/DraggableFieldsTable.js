/* eslint-disable */
import { Button, Divider, Icon, Popconfirm } from 'antd';
import { DraggableTable, FieldTypeIcon } from 'components';
import FieldModal from 'containers/CollectionsPage/FieldModal';
import { withTranslate } from 'hocs';
import { List } from 'immutable';
import { get } from 'lodash';
import { useState } from 'react';
import { fieldArrayFieldsPropTypes } from 'redux-form/immutable';
import { Throw } from 'utils';
import { compose, PropTypes, React, styled } from 'utils/create';

const FieldName = styled.strong`
  display: block;
`;

const Details = styled.div`
  opacity: 0.5;
`;

const DraggableFieldsTable = ({ _, fields }) => {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(-1);

  const handleModalShow = (index = -1) => {
    setShowModal(true);
    setCurrent(index);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalSubmit = field => {
    if (current >= 0) {
      fields.remove(current);
      fields.insert(current, field);
    } else {
      fields.push(field);
    }

    setShowModal(false);
  };

  const dataSource = List(fields.map((name, index) => ({ name, field: fields.get(index) })));
  const columns = [
    {
      align: 'center',
      key: 'type',
      width: 80,
      render: ({ field }) => <FieldTypeIcon type={field.get('type')} />,
    },
    {
      key: 'name',
      render: ({ field }) => (
        <div>
          <FieldName>{field.get('name')}</FieldName>
          <small>{field.get('id')}</small>
        </div>
      ),
    },
    {
      key: 'details',
      render: ({ field, ...props }) => {
        console.log('props', props);
        const type = field.get('type');
        const details = {
          identifier: () => {
            const fieldRef = fields.getAll().find(v => v.get('id') === field.get('fieldRef'));

            return (
              <div>
                {_('collections.attributes.fieldRef')}:{' '}
                {fieldRef ? fieldRef.get('name') : _('global.none')}
              </div>
            );
          },
          string: () => null,
          text: () => null,
        };

        return <Details>{(details[type] || Throw(`Unknown type: ${type}`))()}</Details>;
      },
    },
    {
      align: 'center',
      key: 'actions',
      width: 100,
      render: ({ field }, record, index) => (
        <Button.Group>
          <Button htmlType="button" icon="edit" onClick={() => handleModalShow(index)} />
          {field.get('id') === 'id' ? (
            <Button disabled htmlType="button" icon="delete" />
          ) : (
            <Popconfirm title={_('global.deleteQuestion')} onConfirm={() => fields.remove(index)}>
              <Button htmlType="button" icon="delete" type="danger" />
            </Popconfirm>
          )}
        </Button.Group>
      ),
    },
  ];

  return (
    <div>
      <Divider orientation="right">
        <Button htmlType="button" onClick={() => handleModalShow()}>
          <Icon type="plus" />
          {_('collections.addField')}
        </Button>
      </Divider>

      <FieldModal
        field={fields.get(current)}
        fieldName={get(dataSource[current], 'name')}
        visible={showModal}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />

      <DraggableTable
        columns={columns}
        dataSource={dataSource.toArray()}
        pagination={false}
        rowKey={({ name }) => name}
        showHeader={false}
        onSort={fields.move}
      />
    </div>
  );
};

DraggableFieldsTable.propTypes = {
  _: PropTypes.func.isRequired,
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
};

export default compose(withTranslate)(DraggableFieldsTable);
