import { WithErrorHandlerProps } from 'hocs/types';
import React, { Component, ComponentClass, ErrorInfo } from 'react';
import { getDisplayName } from 'utils/create';

export default <P, S>(WrappedComponent: ComponentClass<P & WithErrorHandlerProps, S>) => {
  class WithErrorHandler extends Component<P> {
    static displayName = `WithErrorHandler(${getDisplayName(WrappedComponent)})`;

    readonly state: WithErrorHandlerProps = {
      error: undefined,
      errorInfo: undefined,
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState({ error, errorInfo });
    }

    render() {
      const { error, errorInfo } = this.state;
      return <WrappedComponent {...this.props} error={error} errorInfo={errorInfo} />;
    }
  }

  return WithErrorHandler;
};
