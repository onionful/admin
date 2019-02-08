import { Input } from 'antd';
import { Lock } from 'components';
import { isEmpty, kebabCase, noop } from 'lodash';
import { change, Field, formValueSelector } from 'redux-form/immutable';
import { Component, connect, PropTypes, React } from 'utils/create';

class Identifier extends Component {
  constructor(...args) {
    super(...args);

    const { field, refValue } = this.props;
    const value = field.get('value');

    this.state = { locked: isEmpty(value) || value === kebabCase(refValue) };
  }

  componentWillUpdate({ refValue }) {
    const { field, handleChange, refValue: oldRefValue } = this.props;
    const { locked } = this.state;

    if (locked && oldRefValue !== refValue) {
      handleChange('content', field.get('id'), kebabCase(refValue));
    }
  }

  handleLock = () => {
    const { locked } = this.state;

    this.setState({ locked: !locked });
  };

  render() {
    const { field } = this.props;
    const { locked } = this.state;
    const { createField } = this.context;

    return (
      <Field
        addonAfter={<Lock locked={locked} onLock={this.handleLock} />}
        component={createField(Input)}
        disabled={locked}
        label={field.get('name')}
        name={field.get('id')}
      />
    );
  }
}

Identifier.propTypes = {
  field: PropTypes.map.isRequired,
  handleChange: PropTypes.func,
  refValue: PropTypes.string,
};

Identifier.defaultProps = {
  handleChange: noop,
  refValue: '',
};

Identifier.contextTypes = {
  createField: PropTypes.func.isRequired,
};

const selector = formValueSelector('content');

const mapStateToProps = (state, { field }) => {
  return {
    refValue: selector(state, field.get('fieldRef')),
  };
};

const mapDispatchToProps = {
  handleChange: change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Identifier);
