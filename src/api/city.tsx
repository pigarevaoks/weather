import { BASE_URL, API_KEY } from './contants';

export interface ICity {
	name: string;
	lat: number;
	lon: number;
	country: string;
}

class CityAPI {
	getCity = async (city: string): Promise<ICity[]> => {
		try {
			const result = await fetch(
				`${BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
			);
			const resultToJson = await result.json();
			return resultToJson;
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const cityAPI = new CityAPI();
