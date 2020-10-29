import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserAuth } from '../../features/user-slice';
import { updateMainWeatherScreen } from '../../features/weather-slice';
import { updateModalState } from '../../features/modal-slice';
import {
	requestWeatherByLocation,
	getSavedCitiesWeather,
	getWeatherStatus,
	getSavedCitiesWeatherStatus,
} from '../../features/weather-slice';
import ErrorPage from '../error';
import MiniLoading from '../loading/mini-loading';
import './user-weather.css';
import EmptyState from '../empty-state';
import FavCitieslist from './fav-cities-weather';

const UserWeather = ({ history }) => {
	const dispatch = useDispatch();

	const { isLoading, isSuccess, hasError } = useSelector(
		getSavedCitiesWeatherStatus
	);

	const savedCitiesWeather = useSelector(getSavedCitiesWeather);
	const auth = useSelector(getIsUserAuth);

	const handleAddCity = () => {
		dispatch(updateModalState(true, 'search'));
	};

	const handleUpdateMainCity = (cityWeather) => {
		history.push('/');
		dispatch(updateMainWeatherScreen([cityWeather]));
	};

	// if (weatherError || savedCitiesError) return <ErrorPage />;

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
			{!auth && <EmptyState />}
			{isLoading ? (
				<MiniLoading />
			) : (
				<FavCitieslist
					savedCitiesWeather={savedCitiesWeather}
					handleUpdateMainCity={handleUpdateMainCity}
				/>
			)}
			{auth && (
				<EuiIcon
					onClick={handleAddCity}
					style={{ marginTop: '1em' }}
					type='plusInCircle'
					size='l'
				/>
			)}
		</div>
	);
};
export default UserWeather;
