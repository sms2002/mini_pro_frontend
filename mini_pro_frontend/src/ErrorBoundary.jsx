import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error);
    // You can also log the errorInfo for more details about the error
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops! Something went wrong.</div>; // Custom error message
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
