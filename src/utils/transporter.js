import fetchApi from './api';

export const fetchCities = () => {
	return fetchApi('municipios');
};

export const fetchCityWeather = (codCity, codTown) => {
	return fetchApi(`provincias/${codCity}/municipios/${codTown}`);
};
