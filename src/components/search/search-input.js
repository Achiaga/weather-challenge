import React, { useEffect, useState } from 'react';
import { EuiComboBox, EuiButton } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { batch, useDispatch, useSelector } from 'react-redux';
import { updateModalState } from '../../features/modal-slice';

import { hasAllData } from './utils';
import { SEARCH_PLACEHOLDER } from '../../constants';

import { requestAddCity, getUserId } from '../../features/user-slice';
import { requestUpdateAddWeather } from '../../features/weather-slice';
import { denormalizeData } from '../../utils/denormalize';
import { normalizeData } from '../../utils/normalize';

const SearchInput = ({ cities, userID }) => {
	const dispatch = useDispatch();
	const auth = useSelector(getUserId);

	const [selectedOptions, setSelected] = useState([]);
	const [options, setOptions] = useState();

	useEffect(() => {
		if (hasAllData(cities)) {
			setOptions(normalizeData({ cities }));
		}
	}, [cities]);

	const onChange = (selectedOptions) => {
		setSelected(selectedOptions);
	};

	const handleAddCityFav = () => {
		if (selectedOptions.length <= 0) return;
		dispatch(updateModalState(false));
		dispatch(requestAddCity(userID, denormalizeData(selectedOptions, cities)));
		setSelected([]);
	};

	const handleGetWeather = () => {
		if (selectedOptions.length <= 0) return;
		dispatch(updateModalState(false));
		dispatch(requestUpdateAddWeather(denormalizeData(selectedOptions, cities)));
		setSelected([]);
	};

	return (
		<>
			<EuiComboBox
				placeholder={SEARCH_PLACEHOLDER}
				options={options}
				singleSelection={{ asPlainText: true }}
				selectedOptions={selectedOptions}
				onChange={onChange}
				style={{ paddingTop: '40px' }}
			/>
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<EuiButton
					style={{
						display: 'flex',
						justifyContent: 'center',
						margin: 'auto',
						marginTop: '30px',
					}}
					onClick={handleGetWeather}>
					Get Weather
				</EuiButton>
				<EuiButton
					style={{
						display: 'flex',
						justifyContent: 'center',
						margin: 'auto',
						marginTop: '30px',
						isDisabled: { auth },
					}}
					onClick={handleAddCityFav}>
					Add to Favorites
				</EuiButton>
			</div>
		</>
	);
};

export default SearchInput;
