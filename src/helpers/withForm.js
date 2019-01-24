import { Form } from 'antd';
import { memoize } from 'lodash';
import { reduxForm } from 'redux-form/immutable';
import { Component, PropTypes, React } from 'utils/create';

const Field = memoize(FormComponent => {
  const FormComponentWrapper = ({
    input: { onFocus, ...input },
    meta: { touched, invalid, error },
    children,
    hasFeedback,
    label,
    ...rest
  }) => {
    const hasError = touched && invalid;

    return (
      <Form.Item
        hasFeedback={hasFeedback && hasError}
        help={hasError && error}
        label={label}
        validateStatus={hasError ? 'error' : 'success'}
      >
        <FormComponent {...input} {...rest}>
          {children}
        </FormComponent>
      </Form.Item>
    );
  };

  FormComponentWrapper.propTypes = {
    children: PropTypes.node,
    hasFeedback: PropTypes.bool,
    input: PropTypes.shape(PropTypes.input),
    label: PropTypes.string,
    meta: PropTypes.shape(PropTypes.meta),
  };

  FormComponentWrapper.defaultProps = {
    children: null,
    hasFeedback: false,
    input: {},
    label: '',
    meta: {},
  };

  return FormComponentWrapper;
});

export default (form, formProps = {}) => WrappedComponent => {
  class withForm extends Component {
    getChildContext() {
      return { createField: Field };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  withForm.childContextTypes = {
    createField: PropTypes.func,
  };

  return reduxForm({ ...formProps, form })(withForm);
};
