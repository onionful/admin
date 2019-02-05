import { Button, Divider, Icon, Popconfirm } from 'antd';
import { DraggableTable, FieldTypeIcon } from 'components';
import FieldModal from 'containers/CollectionsPage/FieldModal';
import { withTranslate } from 'helpers';
import { List } from 'immutable';
import { get } from 'lodash';
import { fieldArrayFieldsPropTypes } from 'redux-form/immutable';
import { Component, compose, PropTypes, React, styled } from 'utils/create';

const FieldName = styled.strong`
  display: block;
`;

class DraggableFieldsTable extends Component {
  state = {
    current: -1,
    showModal: false,
  };

  handleModalShow = (index = -1) => {
    this.setState({ showModal: true, current: index });
  };

  handleModalCancel = () => {
    this.setState({ showModal: false });
  };

  handleModalSubmit = field => {
    const { fields } = this.props;
    const { current } = this.state;

    if (current >= 0) {
      fields.remove(current);
      fields.insert(current, field);
    } else {
      fields.push(field);
    }

    this.setState({ showModal: false });
  };

  render() {
    const { _, fields } = this.props;
    const { current, showModal } = this.state;
    const dataSource = List(fields.map((name, index) => ({ name, field: fields.get(index) })));

    return (
      <div>
        <Divider orientation="right">
          <Button htmlType="button" onClick={() => this.handleModalShow()}>
            <Icon type="plus" />
            {_('collections.addField')}
          </Button>
        </Divider>

        <FieldModal
          field={fields.get(current)}
          fieldName={get(dataSource[current], 'name')}
          visible={showModal}
          onCancel={this.handleModalCancel}
          onSubmit={this.handleModalSubmit}
        />

        <DraggableTable
          columns={[
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
              align: 'center',
              key: 'actions',
              width: 100,
              render: ({ field }, record, index) => (
                <Button.Group>
                  <Button
                    htmlType="button"
                    icon="edit"
                    onClick={() => this.handleModalShow(index)}
                  />
                  <Popconfirm
                    title={_('global.deleteQuestion')}
                    onConfirm={() => fields.remove(index)}
                  >
                    <Button
                      disabled={field.get('id') === 'id'}
                      htmlType="button"
                      icon="delete"
                      type="danger"
                    />
                  </Popconfirm>
                </Button.Group>
              ),
            },
          ]}
          dataSource={dataSource.toArray()}
          pagination={false}
          rowKey={({ name }) => name}
          showHeader={false}
          onSort={fields.move}
        />
      </div>
    );
  }
}

DraggableFieldsTable.propTypes = {
  _: PropTypes.func.isRequired,
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
};

export default compose(withTranslate)(DraggableFieldsTable);
