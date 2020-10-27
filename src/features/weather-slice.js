import { createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchCityWeather } from '../utils/transporter';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';
import { batch } from 'react-redux';

export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		cities: [],
		weather: {},
		locationStatus: '',
		savedCitiesWeather: [],
	},
	reducers: {
		addCities: (state, action) => {
			state.cities = action.payload;
		},
		updateLocationStatus: (state, action) => {
			state.locationStatus = action.payload;
		},
		addWeather: (state, action) => {
			state.weather = action.payload;
		},
		updateWeatherStatus: (state, action) => {
			state.locationStatus = action.payload;
		},
		updateCitiesWeather: (state, action) => {
			state.savedCitiesWeather = action.payload;
		},
	},
});

export const {
	addCities,
	updateLocationStatus,
	addWeather,
	updateCitiesWeather,
	updateWeatherStatus,
} = weatherSlice.actions;

const getCityWeather = async (cities) => {
	const cityWeatherPromises = cities.map((city) => {
		return fetchCityWeather(city.codeCity, city.codeTown);
	});
	const citiesWeather = await Promise.all(cityWeatherPromises);
	return citiesWeather;
};

const getCityCode = (city, cities) => {
	return cities.filter((cityInfo) => {
		return cityInfo.name === city;
	});
};

export const requestCity = () => async (dispatch) => {
	try {
		dispatch(updateLocationStatus(LOADING));
		const results = await fetchCities();
		const cities = results.map((city) => {
			return {
				name: city.NOMBRE,
				codeCity: city.CODPROV,
				codeTown: city.COD_GEO,
			};
		});
		dispatch(addCities(cities));
		const cityWeather = await getCityWeather(getCityCode('Barcelona', cities));

		batch(() => {
			dispatch(addWeather(cityWeather));
			dispatch(updateLocationStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail category request', err);
		dispatch(updateLocationStatus(ERROR));
	}
};

export const requestWeatherByLocation = (savedCities) => async (dispatch) => {
	try {
		dispatch(updateWeatherStatus(LOADING));
		const cityWeather = await getCityWeather(savedCities);
		console.log(cityWeather);
		batch(() => {
			dispatch(updateWeatherStatus(SUCCESS));
			dispatch(updateCitiesWeather(cityWeather));
		});
	} catch (err) {
		console.error('fail category request', err);
		dispatch(updateWeatherStatus(ERROR));
	}
};

export const getWeather = (state) => state.weather;
export const getAllCities = (state) => getWeather(state).cities;
export const getCityStatus = (state) =>
	parseAPIStatus(getWeather(state).locationStatus);

export default weatherSlice.reducer;
