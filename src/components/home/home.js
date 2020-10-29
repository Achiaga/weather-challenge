import React from 'react';
import { useSelector } from 'react-redux';
import { getWeatherData, getWeatherStatus } from '../../features/weather-slice';

import LoadingPage from '../loading';
import ErrorPage from '../error';
import TempGraph from './temp-graph';
import WeatherImg from './weather-img';
import './home.css';

const Home = () => {
	const weatherData = useSelector(getWeatherData);
	const { isLoading, isSuccess, hasError } = useSelector(getWeatherStatus);

	if (hasError) return <ErrorPage />;

	if (isLoading) return <LoadingPage />;

	if (!weatherData || weatherData.length <= 0) return <LoadingPage />;

	const [
		{
			municipio: city,
			stateSky: weather,
			fecha: date,
			temperatura_actual: temp,
			viento: wind,
			lluvia: rain,
			pronostico: graphData,
		},
	] = weatherData;

	return (
		<div className='wrapper'>
			<h4 className='date'>{date}</h4>
			<h1 className='title'>{city.NOMBRE}</h1>
			<h2 className='weather'>{weather.description}</h2>
			<h2 className='temp'>{temp}°</h2>
			<div className='img-wrapper'>
				<WeatherImg weather={weather.description} />
			</div>
			<div className='details-wrapper'>
				<div>
					<h4 className='details-weather'>Wind</h4>
					<h4 className='details-weather-data'>{wind} km/h</h4>
				</div>
				<div>
					<h4 className='details-weather'>Rain</h4>
					<h4 className='details-weather-data'>{rain}%</h4>
				</div>
			</div>
			<TempGraph graphData={graphData} />
		</div>
	);
};
export default Home;
