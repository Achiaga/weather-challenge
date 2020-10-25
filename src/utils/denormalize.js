export const denormalizeData = (selectedOptions) => {
	return selectedOptions.reduce((acc, value) => {
		return [...acc, value['label']];
	}, []);
};
