import React from 'react';
import { Icon, EIconName } from '../icon';
import * as classes from './styles.module.less';

export interface ICardProps {}

export const Card: React.FC<ICardProps> = () => (
  <div className={classes.card}>
    <div className={classes.top}>
      <button className={classes.deleteButton}>
        <Icon name={EIconName.Delete} />
      </button>
      <h2 className={classes.title}>London</h2>
      <div className={classes.temperature} role="text">
        <span className={classes.allyHidden}>Текущая температура</span>
        <span>32</span>
        <span>°C</span>
        <img src="" alt="" />
      </div>
      <span className={classes.description}>Broken clouds</span>
    </div>
    <div className={classes.bottom}>
      <ul className={classes.options}>
        <li className={classes.option}>
          <Icon name={EIconName.Wind} />
          <span className={classes.value}>3,4 m/s</span>
        </li>
        <li className={classes.option}>
          <Icon name={EIconName.Humidity} />
          <span className={classes.value}>76%</span>
        </li>
        <li className={classes.option}>
          <Icon name={EIconName.Pressure} />
          <span className={classes.value}>1026 hPa</span>
        </li>
      </ul>
    </div>
  </div>
);
