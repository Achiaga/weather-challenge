import React from 'react';
import { EuiIcon } from '@elastic/eui';
import './user-weather.css';

const SavedCityCard = ({
	cityWeather,
	handleDeleteCity,
	handleUpdateMainCity,
}) => {
	const handleCitySelected = () => handleUpdateMainCity(cityWeather);
	const handleRemoveCity = (e) => {
		e.stopPropagation();
		handleDeleteCity(cityWeather.municipio.NOMBRE);
	};

	return (
		<div className='saved-city-wrapper' onClick={handleCitySelected}>
			<EuiIcon
				style={{
					position: 'absolute',
					right: '10px',
					top: '10px',
					color: 'red',
				}}
				type='trash'
				size='m'
				onClick={handleRemoveCity}
			/>
			<h1 className='saved-city-name' data-testid='fav-city-name-id'>
				{cityWeather.municipio.NOMBRE}
			</h1>
			<h1 className='saved-city-temp' data-testid='fav-city-temp-id'>
				{cityWeather.temperatura_actual}°
			</h1>
		</div>
	);
};
export default SavedCityCard;
