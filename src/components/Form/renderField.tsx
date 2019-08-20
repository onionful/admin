import { Form } from 'antd';
import { isEmpty } from 'lodash';
import React, { ComponentType, FunctionComponent } from 'react';

interface Props {
  input: any;
  meta: any;
  hasFeedback: boolean;
  label: string;
}

export default <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const FormComponentWrapper: FunctionComponent<Props> = props => {
    const {
      input: { onFocus, ...input },
      meta: { touched, invalid, error },
      children,
      hasFeedback,
      label,
      ...rest
    } = props;
    const hasError = touched && invalid;
    const value = isEmpty(input.value) ? undefined : input.value;

    return (
      <Form.Item
        hasFeedback={hasFeedback && hasError}
        help={hasError && error}
        label={label}
        validateStatus={hasError ? 'error' : 'success'}
      >
        <WrappedComponent {...input} {...rest} value={value}>
          {children}
        </WrappedComponent>
      </Form.Item>
    );
  };

  return FormComponentWrapper;
};
