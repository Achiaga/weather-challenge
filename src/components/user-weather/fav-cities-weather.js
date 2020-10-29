import React from 'react';
import { EuiIcon } from '@elastic/eui';
import './user-weather.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestDeleteCity } from '../../features/weather-slice';
import { getUserId } from '../../features/user-slice';

const FavCitieslist = ({ savedCitiesWeather, handleUpdateMainCity }) => {
	const dispatch = useDispatch();

	const userId = useSelector(getUserId);

	const handleDeleteCity = (city) => {
		dispatch(requestDeleteCity(userId, city));
	};

	return (
		<div style={{ height: '68vh', overflow: 'scroll', width: '100%' }}>
			{savedCitiesWeather.map((cityWeather, index) => {
				const handleCitySelected = () => handleUpdateMainCity(cityWeather);
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
							onClick={() => handleDeleteCity(cityWeather.municipio.NOMBRE)}
						/>
						<h1 className='saved-city-name'>{cityWeather.municipio.NOMBRE}</h1>
						<h1 className='saved-city-temp'>
							{cityWeather.temperatura_actual}°
						</h1>
					</div>
				);
			})}
		</div>
	);
};

export default FavCitieslist;
