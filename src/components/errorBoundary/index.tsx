import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Logo } from '../logo';
import * as classes from './styles.module.less';

interface IProps {
  children: ReactNode;
}
interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  state: IState = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.content}>
          <Logo />
          <span className={classes.title}>Что то пошло не так...</span>
        </div>
      );
    }

    return this.props.children;
  }
}
