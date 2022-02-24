import React from 'react';
import { Icon, EIconName } from '../icon';
import * as classes from './styles.module.less';

interface ICardProps {
  city: string;
  code: string;
  lat: string;
  long: string;
}

export const Card: React.FC<ICardProps> = ({ city, code, lat, long }) => (
  <div className={classes.card}>
    <div className={classes.cardContent}>
      <span className={classes.cardTitle}>{`${city}, ${code}`}</span>
      <span className={classes.cardDescription}>{`${lat}, ${long}`}</span>
    </div>
    <Icon name={EIconName.Add} />
  </div>
);
