/* eslint-disable */
import { Form } from 'antd';
import { memoize } from 'lodash';
import { reduxForm } from 'redux-form/immutable';
import { Component, PropTypes, React } from 'utils/create';

export default (form, formProps = {}) => WrappedComponent => {
  const createField = memoize(
    FormComponent => ({
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

  class withForm extends Component {
    getChildContext() {
      return { createField };
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
