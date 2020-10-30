import React from 'react';
import { EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { requestDeleteCity } from '../../features/weather-slice';
import { getUserId } from '../../features/user-slice';
import './user-weather.css';

import FavcitiesCard from './fav-cities-card';

const FavCitieslist = ({
	savedCitiesWeather,
	handleUpdateMainCity,
	handleAddCity,
}) => {
	const dispatch = useDispatch();

	const userId = useSelector(getUserId);

	const handleDeleteCity = (city) => {
		dispatch(requestDeleteCity(userId, city));
	};

	return (
		<div style={{ height: '68vh', overflow: 'scroll', width: '100%' }}>
			{savedCitiesWeather.map((cityWeather, index) => {
				return (
					<FavcitiesCard
						cityWeather={cityWeather}
						key={cityWeather.municipio.ID_REL}
						handleUpdateMainCity={handleUpdateMainCity}
						handleDeleteCity={handleDeleteCity}
					/>
				);
			})}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<EuiIcon
					onClick={handleAddCity}
					style={{ marginTop: '1em' }}
					type='plusInCircle'
					size='l'
				/>
			</div>
		</div>
	);
};

export default FavCitieslist;
