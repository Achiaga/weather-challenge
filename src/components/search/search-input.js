import React, { useEffect, useState } from 'react';
import { EuiComboBox, EuiButton } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { batch, useDispatch } from 'react-redux';
import { updateModalState } from '../../features/modal-slice';

import { hasAllData } from './utils';
import { SEARCH_PLACEHOLDER } from '../../constants';

import { requestAddCity } from '../../features/user-slice';
import { denormalizeData } from '../../utils/denormalize';
import { normalizeData } from '../../utils/normalize';

const SearchInput = ({ cities, userID }) => {
	const dispatch = useDispatch();

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
		batch(() => {
			dispatch(updateModalState(false));
			dispatch(
				requestAddCity(userID, denormalizeData(selectedOptions, cities))
			);
		});
		setSelected([]);
	};

	return (
		<>
			<EuiComboBox
				placeholder={SEARCH_PLACEHOLDER}
				options={options}
				selectedOptions={selectedOptions}
				onChange={onChange}
				style={{ paddingTop: '40px' }}
			/>
			<EuiButton
				style={{
					display: 'flex',
					justifyContent: 'center',
					margin: 'auto',
					marginTop: '30px',
				}}
				onClick={handleAddCityFav}>
				Add to Favorites
			</EuiButton>
		</>
	);
};

export default SearchInput;
