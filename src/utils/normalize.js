import { CITIES, TOWNS } from '../constants';

const getItemName = (item, type) => {
	const itemKey = { cities: 'NOMBRE_PROVINCIA', towns: 'NOMBRE' }[type];
	return item[itemKey];
};

const normalize = (list, label) => {
	const options = list.reduce(
		(cities, cityName) => [...cities, { label: getItemName(cityName, label) }],
		[]
	);
	return { label, options };
};

export const normalizeData = ({ cities, towns }) => {
	return [normalize(cities, CITIES), normalize(towns, TOWNS)];
};
