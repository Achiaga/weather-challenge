import { createSlice } from '@reduxjs/toolkit';
import { fetchCities, fetchCityWeather } from '../utils/transporter';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';
import { deleteCityUser } from '../utils/database';
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
		removeCities: (state, action) => {
			const index = state.savedCitiesWeather.findIndex(
				(item) => action.payload === item.municipio.NOMBRE
			);
			state.savedCitiesWeather.splice(index, 1);
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
	removeCities,
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
	const matchCity = cities.filter((cityInfo) => {
		return cityInfo.name.toLowerCase() === city.toLowerCase();
	});
	if (matchCity.length < 1) {
		return [{ name: 'Barcelona', codeCity: '08', codeTown: '08019' }];
	}
	return matchCity;
};

export const requestAndSaveCities = (rawCities) => async (dispatch) => {
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
			url: 'https://freegeoip.app/json/',
		}).catch(() => 'Barcelona');
		const cityWeather = await getCityWeather(
			getCityCode((data.data.city = 'Barcelona'), cities)
		);
		batch(() => {
			dispatch(addWeather(cityWeather));
			dispatch(updateWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail city request', err);
		dispatch(updateWeatherStatus(ERROR));
	}
};

export const updateMainWeatherScreen = (cityWeather) => (dispatch) => {
	dispatch(addWeather(cityWeather));
};

export const requestUpdateAddWeather = (city) => async (dispatch, getState) => {
	try {
		dispatch(updateSavedCitiesWeatherStatus(LOADING));
		const cityWeather = await getCityWeather(city);
		batch(() => {
			dispatch(updateMainWeatherScreen(cityWeather));
			dispatch(updateModalState(false));
			dispatch(updateSavedCitiesWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail update weather request', err);
		dispatch(updateSavedCitiesWeatherStatus(ERROR));
	}
};

//TODO:  change names
export const requestWeatherByLocation = (savedCities) => async (
	dispatch,
	getState
) => {
	const hasCitiesSaved = getSavedCitiesWeather(getState()).length;
	if (!hasCitiesSaved) dispatch(updateSavedCitiesWeatherStatus(LOADING));
	requestInitialLocationWeather(savedCities);
};

//TODO:  change names
export const requestInitialLocationWeather = (savedCities) => async (
	dispatch
) => {
	try {
		dispatch(updateSavedCitiesWeatherStatus(LOADING));
		const cityWeather = await getCityWeather(savedCities);
		batch(() => {
			dispatch(updateCitiesWeather(cityWeather));
			dispatch(updateSavedCitiesWeatherStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail initial location weather request', err);
		dispatch(updateSavedCitiesWeatherStatus(ERROR));
	}
};

export const requestDeleteCity = (userId, city) => async (dispatch) => {
	try {
		const deleteCity = await deleteCityUser(userId, city);
		dispatch(removeCities(city));
	} catch (err) {
		console.error('fail delete city request', err);
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
