import React from 'react';
import * as classes from './styles.module.less';

interface IEmtyOptionProps {
  city: string;
}

export const EmtyOption: React.FC<IEmtyOptionProps> = ({ city }) => (
  <div className={classes.emtyOption}>
    <span className={classes.title}>
      {`City called "${city}" was not found`}
    </span>
    <span className={classes.description}>Try different city name</span>
  </div>
);
