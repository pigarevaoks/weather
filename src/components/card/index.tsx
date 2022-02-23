import * as React from 'react';
import * as classes from './styles.module.less';

export interface ICardProps {}

export const Card: React.FC<ICardProps> = () => (
  <div className={classes.card}>
    <div className={classes.top}>
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
        <li className={classes.option}>3,4 m/s</li>
        <li className={classes.option}>76%</li>
        <li className={classes.option}>1026 hPa</li>
      </ul>
    </div>
  </div>
);
