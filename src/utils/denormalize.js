export const denormalizeData = (selectedOptions, cities) => {
	const cityName = getCityName(selectedOptions);
	return cities.filter((cityInfo) => {
		return cityInfo.name === cityName[0];
	});
};

const getCityName = (selectedOptions) => {
	return selectedOptions.reduce((acc, value) => {
		return [...acc, value['label']];
	}, []);
};
