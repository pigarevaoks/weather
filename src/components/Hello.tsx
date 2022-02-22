import * as React from 'react';
import * as classes from './styles.module.less';
import AddIcon from '../assets/icons/add.svg';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1 className={classes.title}>
        <AddIcon />
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
