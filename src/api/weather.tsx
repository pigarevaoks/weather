import { BASE_URL, API_KEY } from './contants';

class WeatherAPI {
  getWeather = async (lat: string, lon: string) => {
    try {
      const result = await await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      return result.json();
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const weatherAPI = new WeatherAPI();
