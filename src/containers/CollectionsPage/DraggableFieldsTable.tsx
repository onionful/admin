import { Button, Divider, Icon, Popconfirm } from 'antd';
import { DraggableTable, FieldTypeIcon } from 'components';
import FieldModal from 'containers/CollectionsPage/FieldModal';
import { withTranslate } from 'hocs';
import { get } from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Throw } from 'utils';
import { compose, styled } from 'utils/create';

interface Props {
  fields: any;
}

const FieldName = styled.strong`
  display: block;
`;

const Details = styled.div`
  opacity: 0.5;
`;

const DraggableFieldsTable: FunctionComponent<Props> = ({ fields }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(-1);

  const handleModalShow = (index = -1) => {
    setShowModal(true);
    setCurrent(index);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  // @ts-ignore
  const handleModalSubmit = field => {
    if (current >= 0) {
      fields.remove(current);
      fields.insert(current, field);
    } else {
      fields.push(field);
    }

    setShowModal(false);
  };

  // @ts-ignore
  const dataSource = fields.map((name, index) => ({ name, field: fields.get(index) }));
  const columns = [
    {
      align: 'center',
      key: 'type',
      width: 80,
      // @ts-ignore
      // @ts-ignore
      render: ({ field }) => <FieldTypeIcon type={field.get('type')} />,
    },
    {
      key: 'name',
      // @ts-ignore
      render: ({ field }) => (
        <div>
          <FieldName>{field.get('name')}</FieldName>
          <small>{field.get('id')}</small>
        </div>
      ),
    },
    {
      key: 'details',
      // @ts-ignore
      render: ({ field, ...props }) => {
        console.log('props', props);
        const type = field.get('type');
        const details = {
          identifier: () => {
            // @ts-ignore
            const fieldRef = fields.getAll().find(v => v.get('id') === field.get('fieldRef'));

            return (
              <div>
                {t('collections.attributes.fieldRef')}:{' '}
                {fieldRef ? fieldRef.get('name') : t('global.none')}
              </div>
            );
          },
          string: () => null,
          text: () => null,
        };

        // @ts-ignore
        return <Details>{(details[type] || Throw(`Unknown type: ${type}`))()}</Details>;
      },
    },
    {
      align: 'center',
      key: 'actions',
      width: 100,
      // @ts-ignore
      render: ({ field }, record, index) => (
        <Button.Group>
          <Button htmlType="button" icon="edit" onClick={() => handleModalShow(index)} />
          {field.get('id') === 'id' ? (
            <Button disabled htmlType="button" icon="delete" />
          ) : (
            <Popconfirm title={t('global.deleteQuestion')} onConfirm={() => fields.remove(index)}>
              <Button htmlType="button" icon="delete" type="danger" />
            </Popconfirm>
          )}
        </Button.Group>
      ),
    },
  ];

  // @ts-ignore
  return (
    <>
      <Divider orientation="right">
        <Button htmlType="button" onClick={() => handleModalShow()}>
          <Icon type="plus" />
          {t('collections.addField')}
        </Button>
      </Divider>
      <FieldModal
        field={fields.get(current)}
        fieldName={get(dataSource[current], 'name')}
        visible={showModal}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
      // @ts-ignore
      <DraggableTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        // @ts-ignore
        rowKey={({ name }) => name}
        showHeader={false}
        onSort={fields.move}
      />
    </>
  );
};

// DraggableFieldsTable.propTypes = {
//   _: PropTypes.func.isRequired,
//   fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
// };

export default compose<FunctionComponent<Props>>(withTranslate)(DraggableFieldsTable);
