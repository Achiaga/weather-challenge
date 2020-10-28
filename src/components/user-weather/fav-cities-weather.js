import React from 'react';
import { EuiIcon } from '@elastic/eui';
import './user-weather.css';

const FavCitieslist = ({ savedCitiesWeather }) => {
	// const dispatch = useDispatch();
	const handleCitySelected = () => {};

	return savedCitiesWeather.map((cityWeather, index) => {
		return (
			<div
				className='saved-city-wrapper'
				key={`fav-city-weather${index}`}
				onClick={handleCitySelected}>
				<EuiIcon
					style={{
						position: 'absolute',
						right: '10px',
						top: '10px',
						color: 'red',
					}}
					type='trash'
					size='m'
				/>
				<h1 className='saved-city-name'>{cityWeather.municipio.NOMBRE}</h1>
				<h1 className='saved-city-temp'>{cityWeather.temperatura_actual}°</h1>
			</div>
		);
	});
};

export default FavCitieslist;
