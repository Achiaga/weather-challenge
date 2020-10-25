import React, { useEffect, useState } from 'react';
import { EuiComboBox } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { useDispatch } from 'react-redux';
import { requestAddCity, requestSavedCities } from '../../features/user-slice';
import { denormalizeData } from '../../utils/denormalize';
import { normalizeData } from '../../utils/normalize';
import { hasAllData } from './utils';

const SearchInput = ({ cities, towns, userID }) => {
	const [selectedOptions, setSelected] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [options, setOptions] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		if (hasAllData(cities, towns)) {
			setOptions(normalizeData({ cities, towns }));
		}
	}, [cities, towns]);

	const onChange = (selectedOptions) => {
		setSelected(selectedOptions);
		setSelectedCities(denormalizeData(selectedOptions));
	};

	const handleAddCityFav = () => {
		dispatch(requestAddCity(userID, selectedCities));
		setSelected([]);
	};

	return (
		<>
			<EuiComboBox
				placeholder='Select one or more options'
				options={options}
				selectedOptions={selectedOptions}
				onChange={onChange}
			/>
			<button onClick={handleAddCityFav}>Add to Favorites</button>
		</>
	);
};

export default SearchInput;
