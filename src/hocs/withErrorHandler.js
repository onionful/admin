import { Component, getDisplayName, React } from 'utils/create';

export default WrappedComponent => {
  class WithErrorHandler extends Component {
    static displayName = `WithErrorHandler(${getDisplayName(WrappedComponent)})`;

    state = {
      error: undefined,
      errorInfo: undefined,
    };

    componentDidCatch(error, errorInfo) {
      this.setState({ error, errorInfo });
    }

    render() {
      const { error, errorInfo } = this.state;
      return <WrappedComponent {...this.props} error={error} errorInfo={errorInfo} />;
    }
  }

  return WithErrorHandler;
};
