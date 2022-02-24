import React from 'react';
import { Logo } from '../Logo';
import * as classes from './styles.module.less';

export const Header: React.FC = () => (
  <header className={classes.header}>
    <div className={classes.line} />
    <div className={classes.logo}>
      <Logo />
    </div>
  </header>
);
