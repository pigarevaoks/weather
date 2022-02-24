import React from 'react';
import AddIcon from '../../assets/icons/add.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import HumidityIcon from '../../assets/icons/humidity.svg';
import PressureIcon from '../../assets/icons/pressure.svg';
import SearchIcon from '../../assets/icons/search.svg';
import WindIcon from '../../assets/icons/wind.svg';
import * as classes from './styles.module.less';

export enum EIconName {
  Add = 'ADD',
  Delete = 'DELETE',
  Humidity = 'HUMIDITY',
  Pressure = 'PRESSURE',
  Search = 'SEARCH',
  Wind = 'WIND',
}

interface IIconProps {
  name: EIconName;
}

const geiIconByName = (name: EIconName): React.ReactElement => {
  switch (name) {
    case EIconName.Add:
      return <AddIcon />;
    case EIconName.Delete:
      return <DeleteIcon />;
    case EIconName.Humidity:
      return <HumidityIcon />;
    case EIconName.Pressure:
      return <PressureIcon />;
    case EIconName.Search:
      return <SearchIcon />;
    case EIconName.Wind:
      return <WindIcon />;
    default:
      return <AddIcon />;
  }
};

export const Icon: React.FC<IIconProps> = ({ name }) => {
  const icon = geiIconByName(name);

  return <div className={classes.icon}>{icon}</div>;
};
