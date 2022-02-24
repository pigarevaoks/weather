import React from 'react';
import { Icon, EIconName } from '../icon';
import { ICity } from '../../api/city';
import * as classes from './styles.module.less';

interface ICardProps {
  city: string;
  code: string;
  lat: number;
  lon: number;
}

export const Card: React.FC<ICardProps> = ({ city, code, lat, lon }) => (
  <div className={classes.card}>
    <div className={classes.cardContent}>
      <span className={classes.cardTitle}>{`${city}, ${code}`}</span>
      <span className={classes.cardDescription}>{`${lat}, ${lon}`}</span>
    </div>
    <Icon name={EIconName.Add} />
  </div>
);
