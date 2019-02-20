import { IWithErrorHandler } from 'hocs/types';
import React, { ComponentClass, ErrorInfo } from 'react';
import { getDisplayName } from 'utils/create';

export default <P, S>(WrappedComponent: ComponentClass<P & IWithErrorHandler, S>) => {
  class WithErrorHandler extends React.Component {
    static displayName = `WithErrorHandler(${getDisplayName(WrappedComponent)})`;

    readonly state: IWithErrorHandler = {
      error: undefined,
      errorInfo: undefined,
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState({ error, errorInfo });
    }

    render() {
      const { error, errorInfo } = this.state;
      return <WrappedComponent {...this.props as P} error={error} errorInfo={errorInfo} />;
    }
  }

  return WithErrorHandler;
};
