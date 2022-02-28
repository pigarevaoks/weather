import { BASE_URL, API_KEY } from './contants';

class WeatherAPI {
  getWeather = async (lat: number, lon: number) => {
    try {
      const result = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
      );
      const resultToJson = await result.json();

      return resultToJson;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const weatherAPI = new WeatherAPI();
