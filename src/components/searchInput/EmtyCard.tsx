import React from 'react';
import * as classes from './styles.module.less';

interface IEmtyCardProps {
  city: string;
}

export const EmtyCard: React.FC<IEmtyCardProps> = ({ city }) => (
  <div className={classes.emtyCard}>
    <span className={classes.cardTitle}>
      {`City called "${city}" was not found`}
    </span>
    <span className={classes.cardDescription}>Try different city name</span>
  </div>
);
