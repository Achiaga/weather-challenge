import React from 'react';
import { EuiIcon } from '@elastic/eui';
import './user-weather.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestDeleteCity } from '../../features/weather-slice';
import { getUserId } from '../../features/user-slice';

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
			<h1 className='saved-city-name'>{cityWeather.municipio.NOMBRE}</h1>
			<h1 className='saved-city-temp'>{cityWeather.temperatura_actual}°</h1>
		</div>
	);
};

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
					<SavedCityCard
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
