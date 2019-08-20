import { Form } from 'antd';
import { isEmpty, memoize } from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes } from 'utils/create';

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
    const value = isEmpty(input.value) ? undefined : input.value;

    return (
      <Form.Item
        hasFeedback={hasFeedback && hasError}
        help={hasError && error}
        label={label}
        validateStatus={hasError ? 'error' : 'success'}
      >
        <FormComponent {...input} {...rest} value={value}>
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
