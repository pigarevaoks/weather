import React from 'react';
import { Icon, EIconName } from '../icon';
import * as classes from './styles.module.less';

export interface ICityOptionProps {
  city: string;
  code: string;
  lat: number;
  lon: number;
}

interface IOptionProps extends ICityOptionProps {
  onAddCity: (data: ICityOptionProps) => void;
}

export const Option: React.FC<IOptionProps> = ({
  city,
  code,
  lat,
  lon,
  onAddCity,
}) => {
  const onCardClick = () => onAddCity({ city, code, lat, lon });

  return (
    <button className={classes.option} onClick={onCardClick} type="button">
      <div>
        <span className={classes.title}>{`${city}, ${code}`}</span>
        <span className={classes.description}>{`${lat}, ${lon}`}</span>
      </div>
      <Icon name={EIconName.Add} />
    </button>
  );
};
