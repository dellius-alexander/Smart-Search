import { Component }  from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: {}, errorInfo: {} };
        this.logErrorToServices = this.logErrorToServices.bind(this);
        this.componentDidCatch = this.componentDidCatch.bind(this);
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        if (error) {
            return { hasError: true, error: error };
        }
        return { hasError: false, error: error };
    }

    // Console logging service
    // eslint-disable-next-line class-methods-use-this
    logErrorToServices = (error, errorInfo) => console.dir({error, errorInfo});

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({hasError: true, error: error, errorInfo: errorInfo});
        this.logErrorToServices(error, errorInfo);
    }

    render() {
        const {hasError, error, errorInfo} = this.state;

        if (hasError) {
            return (
                <>
                    <div onError={this.componentDidCatch}>
                        <h1>An error has occurred</h1>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>
                            {error && error.toString()}
                            <br />
                            {errorInfo.componentStack}
                        </pre>
                    </div>
                </>
            );
        }
        return (this.props.children);
    }
}

export default ErrorBoundary;