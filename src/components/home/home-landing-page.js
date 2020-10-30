import React from 'react';
import TempGraph from './temp-graph';
import WeatherImg from './weather-img';

const HomeLandingPage = ({ weatherData }) => {
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
			<h4 className='date' data-testid='home-date'>
				{date}
			</h4>
			<h1 className='title' data-testid='home-city-name'>
				{city.NOMBRE}
			</h1>
			<h2 className='weather' data-testid='home-city-weather'>
				{weather.description}
			</h2>
			<h2 className='temp' data-testid='home-temp'>
				{temp}°
			</h2>
			<div className='img-wrapper'>
				<WeatherImg weather={weather.description} />
			</div>
			<div className='details-wrapper'>
				<div>
					<h4 className='details-weather'>Wind</h4>
					<h4 className='details-weather-data' data-testid='home-wind'>
						{wind} km/h
					</h4>
				</div>
				<div>
					<h4 className='details-weather'>Rain</h4>
					<h4 className='details-weather-data' data-testid='home-rain'>
						{rain}%
					</h4>
				</div>
			</div>
			<TempGraph graphData={graphData} />
		</div>
	);
};
export default HomeLandingPage;
