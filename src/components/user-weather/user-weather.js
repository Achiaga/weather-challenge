import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesSaved, getIsUserAuth } from '../../features/user-slice';
import { updateModalState } from '../../features/modal-slice';
import {
	requestWeatherByLocation,
	getSavedCitiesWeather,
	getWeatherStatus,
	getSavedCitiesWeatherStatus,
} from '../../features/weather-slice';
import ErrorPage from '../error';
import LoadingPage from '../loading';
import './user-weather.css';
import EmptyState from '../empty-state';
import FavCitieslist from './fav-cities-weather';

const UserWeather = () => {
	const dispatch = useDispatch();
	const { isSuccess: weatherSuccess, hasError: weatherError } = useSelector(
		getWeatherStatus
	);
	const {
		isLoading: savedCitiesLoading,
		isSuccess: savedCitiesSucces,
		hasError: savedCitiesError,
	} = useSelector(getSavedCitiesWeatherStatus);

	const citiesSaved = useSelector(getCitiesSaved);
	const savedCitiesWeather = useSelector(getSavedCitiesWeather);
	const auth = useSelector(getIsUserAuth);

	// useEffect(() => {
	// 	dispatch(requestWeatherByLocation(citiesSaved));
	// }, [citiesSaved]);

	const handleAddCity = () => {
		dispatch(updateModalState(true));
	};

	if (weatherError || savedCitiesError) return <ErrorPage />;

	if (savedCitiesLoading) return <LoadingPage />;

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
			<FavCitieslist savedCitiesWeather={savedCitiesWeather} />
			{auth && (
				<EuiIcon
					onClick={handleAddCity}
					style={{ marginTop: '1em' }}
					type='listAdd'
					size='l'
				/>
			)}
		</div>
	);
};
export default UserWeather;
