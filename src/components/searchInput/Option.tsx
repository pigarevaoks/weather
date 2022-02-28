import React from 'react';
import { Icon, EIconName } from 'components/icon';
import { ICity } from 'api/city';
import * as classes from './styles.module.less';

interface IOptionProps extends ICity {
  onSelect: (data: ICity) => void;
}

export const Option: React.FC<IOptionProps> = ({
  name,
  country,
  lat,
  lon,
  onSelect,
}) => {
  const onOptionClick = () => onSelect({ name, country, lat, lon });

  return (
    <button className={classes.option} onClick={onOptionClick} type="button">
      <div>
        <span className={classes.title}>{`${name}, ${country}`}</span>
        <span className={classes.description}>{`${lat}, ${lon}`}</span>
      </div>
      <Icon name={EIconName.Add} />
    </button>
  );
};
