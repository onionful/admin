import { Button, Divider, Icon, Popconfirm } from 'antd';
import { DraggableTable, FieldTypeIcon } from 'components';
import FieldModal from 'containers/CollectionsPage/FieldModal';
import { withTranslate } from 'hocs';
import { List } from 'immutable';
import { get } from 'lodash';
import { fieldArrayFieldsPropTypes } from 'redux-form/immutable';
import { Throw } from 'utils';
import { Component, compose, PropTypes, React, styled } from 'utils/create';

const FieldName = styled.strong`
  display: block;
`;

const Details = styled.div`
  opacity: 0.5;
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

  renderFieldDetails = field => {
    const { _, fields } = this.props;
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
              key: 'details',
              render: ({ field }) => this.renderFieldDetails(field),
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
                  {field.get('id') === 'id' ? (
                    <Button disabled htmlType="button" icon="delete" />
                  ) : (
                    <Popconfirm
                      title={_('global.deleteQuestion')}
                      onConfirm={() => fields.remove(index)}
                    >
                      <Button htmlType="button" icon="delete" type="danger" />
                    </Popconfirm>
                  )}
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
