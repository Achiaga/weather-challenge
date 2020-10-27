import { CITIES } from '../constants';

const normalize = (list, label) => {
	const options = list.reduce(
		(cities, cityName) => [...cities, { label: cityName.name }],
		[]
	);
	return { label, options };
};

export const normalizeData = ({ cities }) => {
	return [normalize(cities, CITIES)];
};
