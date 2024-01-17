import React from 'react';

interface State {
  error?: Error;
}

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('componentDidCatch', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}