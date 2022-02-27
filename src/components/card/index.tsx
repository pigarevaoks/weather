import React from 'react';
import { Icon, EIconName } from '../icon';
import { capitalize, getWeatherIconByName } from '../../utils';
import * as classes from './styles.module.less';

export interface IWeatherProps {
  description: string;
  icon: string;
}
export interface IWindProps {
  speed: number;
}
export interface IMainWeatherProps {
  temp: number;
  humidity: number;
  pressure: number;
}

export interface IBaseCard {
  id: number;
  name: string;
  main: IMainWeatherProps;
  wind: IWindProps;
  weather: IWeatherProps[];
}
interface ICardProps extends IBaseCard {
  onDeleteCard: (id: number) => void;
}

export const Card: React.FC<ICardProps> = ({
  id,
  name,
  main,
  wind,
  weather,
  onDeleteCard,
}) => {
  const description = capitalize(weather[0].description);
  const iconLink = getWeatherIconByName(weather[0].icon);
  const onDeleteCardClick = () => onDeleteCard(id);

  return (
    <div className={classes.card}>
      <div className={classes.top}>
        <button className={classes.deleteButton} onClick={onDeleteCardClick}>
          <Icon name={EIconName.Delete} />
        </button>
        <h2 className={classes.title}>{name}</h2>
        <div className={classes.temperature} role="text">
          <span className={classes.allyHidden}>Текущая температура</span>
          <span>{Math.ceil(main.temp)}</span>
          <span>°C</span>
          <img className={classes.icon} src={iconLink} alt={description} />
        </div>
        <span className={classes.description}>{description}</span>
      </div>
      <div className={classes.bottom}>
        <ul className={classes.options}>
          <li className={classes.option}>
            <Icon name={EIconName.Wind} />
            <span className={classes.value}>{`${wind.speed} m/s`}</span>
          </li>
          <li className={classes.option}>
            <Icon name={EIconName.Humidity} />
            <span className={classes.value}>{`${main.humidity}%`}</span>
          </li>
          <li className={classes.option}>
            <Icon name={EIconName.Pressure} />
            <span className={classes.value}>{`${main.pressure} hPa`}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
