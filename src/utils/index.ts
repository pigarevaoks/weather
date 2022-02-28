import { ICON_URL } from 'api/contants';

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getWeatherIconByName = (name: string): string =>
  `${ICON_URL}/${name}@2x.png`;
