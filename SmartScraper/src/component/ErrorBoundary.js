import { Component } from "react";

/**
 * ErrorBoundary
 *
 * A React Component class that catches errors and displays a fallback UI when an error occurs.
 */
class ErrorBoundary extends Component {
  /**
   * Constructor
   *
   * @param {Object} props - The props for the component.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {}, errorInfo: {} };
    this.componentDidCatch = this.componentDidCatch.bind(this);
  }

  /**
   * getDerivedStateFromError
   *
   * @param {Object} error - The error object.
   *
   * @return {Object} - The state values.
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if (error) {
      return { hasError: true, error: error };
    }
    return { hasError: false, error: error };
  }

  /**
   * logErrorToServices
   *
   * Logs the error to a service
   *
   * @param {Error} error - The error object.
   * @param {React.ErrorInfo} errorInfo - The error info object.
   */
  // eslint-disable-next-line class-methods-use-this
  logErrorToServices = (error, errorInfo) => console.dir({error, errorInfo});


  /**
   * componentDidCatch
   *
   * @param {Error} error - The error object.
   * @param {React.ErrorInfo} errorInfo - The error info object.
   */
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
    this.logErrorToServices(error, errorInfo);
  }

  /**
   * render error
   *
   * @return {React.Component} - The React Component.
   */
  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <>
          <div
            onError={this.componentDidCatch}
            style={{
              padding: "1.5rem"
            }}
          >
            <h1>An error has occurred</h1>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </pre>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
