import React from 'react';
import rainImg from '../../assets/rain.png';
import sunImg from '../../assets/sun.png';
import cloudImg from '../../assets/cloud.png';
import snowImg from '../../assets/snow.png';
import stormImg from '../../assets/storm.png';

const checkStatusWeather = (weather, values) => {
	let coincidance = false;

	values.map((value) => {
		if (weather.includes(value)) coincidance = true;
	});

	return coincidance;
};

const WeatherImg = ({ weather }) => {
	let weatherBg = sunImg;
	const lluvia = ['lluvia', 'lluvioso', 'llover'];
	const nublado = ['nublado', 'nuboso'];
	const tormenta = ['tormenta'];
	const nieve = ['nieve'];

	if (checkStatusWeather(weather, lluvia)) weatherBg = rainImg;
	if (checkStatusWeather(weather, nublado)) weatherBg = cloudImg;
	if (checkStatusWeather(weather, tormenta)) weatherBg = stormImg;
	if (checkStatusWeather(weather, nieve)) weatherBg = snowImg;

	return <img className='img-bg' src={weatherBg} alt='home-bg' />;
};

export default WeatherImg;
