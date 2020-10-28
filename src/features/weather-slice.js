import { createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchCityWeather } from '../utils/transporter';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';
import { batch } from 'react-redux';
import axios from 'axios';

import history from '../utils/history';
import { updateModalState } from './modal-slice';

export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		cities: [],
		weather: [],
		savedCitiesWeather: [],
		weatherStatus: '',
		savedCitiesWeatherStatus: '',
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
			state.weatherStatus = action.payload;
		},
		updateCitiesWeather: (state, action) => {
			state.savedCitiesWeather = action.payload;
		},
		updateSavedCitiesWeatherStatus: (state, action) => {
			state.savedCitiesWeatherStatus = action.payload;
		},
	},
});

export const {
	addCities,
	addWeather,
	updateCitiesWeather,
	updateWeatherStatus,
	updateSavedCitiesWeatherStatus,
} = weatherSlice.actions;

const getCityWeather = async (cities) => {
	const cityWeatherPromises = cities.map((city) => {
		return fetchCityWeather(city.codeCity, city.codeTown);
	});
	const citiesWeather = await Promise.all(cityWeatherPromises);
	return citiesWeather;
};

const getCityCode = (city, cities) => {
	console.log(city, cities);
	return cities.filter((cityInfo) => {
		return cityInfo.name.toLowerCase() === city.toLowerCase();
	});
};

export const requestCity = (rawCities) => async (dispatch) => {
	try {
		dispatch(updateWeatherStatus(LOADING));
		const cities = rawCities.map((city) => {
			return {
				name: city.NOMBRE,
				codeCity: city.CODPROV,
				codeTown: city.CODIGOINE.slice(0, 5),
			};
		});
		dispatch(addCities(cities));
		const data = await axios({
			method: 'get',
			url: 'http://ip-api.com/json',
		});
		console.log(data.data.city);
		const cityWeather = await getCityWeather(
			getCityCode(data.data.city, cities)
		);
		console.log(cityWeather);
		batch(() => {
			dispatch(addWeather(cityWeather));
			dispatch(updateWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail category request', err);
		dispatch(updateWeatherStatus(ERROR));
	}
};

export const requestUpdateAddWeather = (city) => async (dispatch, getState) => {
	try {
		console.log(city[0]);
		dispatch(updateSavedCitiesWeatherStatus(LOADING));
		const cityWeather = await getCityWeather(city);
		console.log({ cityWeather });
		batch(() => {
			dispatch(addWeather(cityWeather));
			history.push('/');
			dispatch(updateModalState(false));
			dispatch(updateSavedCitiesWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail category request', err);
		dispatch(updateSavedCitiesWeatherStatus(ERROR));
	}
};

export const requestWeatherByLocation = (savedCities) => async (
	dispatch,
	getState
) => {
	try {
		const hasCitiesSaved = getSavedCitiesWeather(getState()).length;
		if (!hasCitiesSaved) dispatch(updateSavedCitiesWeatherStatus(LOADING));
		const cityWeather = await getCityWeather(savedCities);
		batch(() => {
			dispatch(updateCitiesWeather(cityWeather));
			dispatch(updateSavedCitiesWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail category request', err);
		dispatch(updateSavedCitiesWeatherStatus(ERROR));
	}
};

export const getWeather = (state) => state.weather;
export const getAllCities = (state) => getWeather(state).cities;
export const getWeatherData = (state) => getWeather(state).weather;
export const getSavedCitiesWeather = (state) =>
	getWeather(state).savedCitiesWeather;
export const getWeatherStatus = (state) =>
	parseAPIStatus(getWeather(state).weatherStatus);
export const getSavedCitiesWeatherStatus = (state) =>
	parseAPIStatus(getWeather(state).savedCitiesWeatherStatus);

export default weatherSlice.reducer;
