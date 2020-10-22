import fetchApi from './api';

export const fetchCities = () => {
	return fetchApi('provincias');
};

export const fetchMunicipality = () => {
	return fetchApi('municipios');
};

export const fetchCityWeather = () => {
	return fetchApi('provincias/20');
};

export const fetchMunicipalityWeather = () => {
	return fetchApi('provincias/01/municipios/01010');
};
