import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserAuth } from '../../features/user-slice';
import { updateMainWeatherScreen } from '../../features/weather-slice';
import { updateModalState } from '../../features/modal-slice';
import {
	getSavedCitiesWeather,
	getSavedCitiesWeatherStatus,
} from '../../features/weather-slice';
import MiniLoading from '../loading/mini-loading';
import './user-weather.css';
import EmptyState from '../empty-state';
import EmptyCities from '../empty-state/empty-cities';
import FavCitieslist from './fav-cities-weather';

const UserWeatherContent = ({
	auth,
	loading,
	savedCitiesWeather,
	handleUpdateMainCity,
	handleAddCity,
}) => {
	if (loading) return <MiniLoading />;
	if (!auth) return <EmptyState />;
	if (savedCitiesWeather.length < 1)
		return <EmptyCities handleAddCity={handleAddCity} />;

	return (
		<>
			<FavCitieslist
				savedCitiesWeather={savedCitiesWeather}
				handleUpdateMainCity={handleUpdateMainCity}
				handleAddCity={handleAddCity}
			/>
		</>
	);
};

const UserWeather = ({ history }) => {
	const dispatch = useDispatch();

	const { isLoading } = useSelector(getSavedCitiesWeatherStatus);
	const savedCitiesWeather = useSelector(getSavedCitiesWeather);
	const auth = useSelector(getIsUserAuth);

	const handleAddCity = () => {
		dispatch(updateModalState(true, 'search'));
	};

	const handleUpdateMainCity = (cityWeather) => {
		history.push('/');
		dispatch(updateMainWeatherScreen([cityWeather]));
	};

	return (
		<div className='user-weather-wrapper'>
			<div className='user-weather-header'>
				<h1 className='user-weather-title'>My Weather</h1>
				<div className='user-weather-profile'>
					<Link to='/profile'>
						<EuiIcon type='managementApp' size='xl' />
					</Link>
				</div>
			</div>
			<UserWeatherContent
				auth={auth}
				loading={isLoading}
				handleAddCity={handleAddCity}
				savedCitiesWeather={savedCitiesWeather}
				handleAddCity={handleAddCity}
				handleUpdateMainCity={handleUpdateMainCity}
			/>
		</div>
	);
};
export default UserWeather;
