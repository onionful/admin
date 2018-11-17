import { Form } from 'antd';
import { memoize } from 'lodash';
import { formValues, reduxForm } from 'redux-form/immutable';
import { Component, compose, PropTypes, React } from 'utils/create';

export default (form, formProps = {}) => WrappedComponent => {
  const createField = memoize(
    (FormComponent, { keepInputProp = false, formValues: formValuesMapping } = {}) => {
      const ItemComponent = ({
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
            <FormComponent {...(keepInputProp ? { input } : input)} {...rest}>
              {children}
            </FormComponent>
          </Form.Item>
        );
      };

      return formValuesMapping ? formValues(formValuesMapping)(ItemComponent) : ItemComponent;
    },
  );

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

  return compose(reduxForm({ ...formProps, form }))(withForm);
};
