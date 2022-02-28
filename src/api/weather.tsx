import { BASE_URL, API_KEY } from './contants';

export interface IWeather {
  description: string;
  icon: string;
}
export interface IWind {
  speed: number;
}
export interface IMainWeather {
  temp: number;
  humidity: number;
  pressure: number;
}

export interface ICard {
  id: number;
  name: string;
  main: IMainWeather;
  wind: IWind;
  weather: IWeather[];
}

class WeatherAPI {
  getWeather = async (lat: number, lon: number): Promise<ICard> => {
    try {
      const result = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const resultToJson = await result.json();

      return resultToJson;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const weatherAPI = new WeatherAPI();
