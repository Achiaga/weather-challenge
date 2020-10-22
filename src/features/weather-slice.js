import { createSlice } from '@reduxjs/toolkit';
import {
	fetchCities,
	fetchMunicipality,
	fetchCityWeather,
	fetchMunicipalityWeather,
} from '../utils/transporter';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';

export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		citiesList: [],
		municipalitiesList: [],
		city: '20',
		municipality: '',
		weather: {},
		locationStatus: '',
	},
	reducers: {
		addCities: (state, action) => {
			state.citiesList = action.payload[0].provincias;
			state.municipalitiesList = action.payload[1];
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
	},
});

export const {
	addCities,
	updateLocationStatus,
	addWeather,
	updateWeatherStatus,
} = weatherSlice.actions;

export const requestLocation = () => async (dispatch) => {
	try {
		dispatch(updateLocationStatus(LOADING));
		const results = await Promise.all([fetchCities(), fetchMunicipality()]);
		console.log(results);
		dispatch(updateLocationStatus(SUCCESS));
		dispatch(addCities(results));
	} catch (err) {
		console.error('fail category request');
		dispatch(updateLocationStatus(ERROR));
	}
};

export const requestWeatherByLocation = () => async (dispatch) => {
	try {
		dispatch(updateWeatherStatus(LOADING));
		const results = await Promise.all([
			fetchCityWeather(),
			fetchMunicipalityWeather(),
		]);
		console.log(results);
		dispatch(updateWeatherStatus(SUCCESS));
		dispatch(addWeather(results));
	} catch (err) {
		console.error('fail category request');
		dispatch(updateWeatherStatus(ERROR));
	}
};

// export const getJokes = (state) => state.jokes;
// export const getAllCities = (state) => getJokes(state).categories;
// export const getCityStatus = (state) =>
// 	parseAPIStatus(getJokes(state).fetchCategoriesStatus);

export default weatherSlice.reducer;
