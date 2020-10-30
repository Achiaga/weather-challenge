import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherData, getWeatherStatus } from '../../features/weather-slice';

import LoadingPage from '../loading';
import ErrorPage from '../error';
import HomeLandingPage from './home-landing-page';
import './home.css';

const Home = () => {
	const weatherData = useSelector(getWeatherData);
	const { isLoading, isSuccess, hasError } = useSelector(getWeatherStatus);

	if (hasError) return <ErrorPage />;

	if (isLoading) return <LoadingPage />;

	if (!weatherData || weatherData.length <= 0) return <LoadingPage />;

	return <HomeLandingPage weatherData={weatherData} />;
};
export default Home;
