import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import HomeLandingPage from './home-landing-page';

const renderComponent = (props) => {
	return render(<HomeLandingPage {...props} />);
};

const initialProps = {
	weatherData: [
		{
			municipio: { NOMBRE: 'Madrid' },
			stateSky: { description: 'despejado' },
			fecha: '01-01-2000',
			temperatura_actual: '22',
			viento: '10',
			lluvia: '50',
			pronostico: { hoy: { temperatura: [0, 12, 20, 23, 14] } },
		},
	],
};

const HOME_CITY_NAME_ID = 'home-city-name';
const HOME_CITY_WEATHER = 'home-city-weather';
const HOME_DATE = 'home-date';
const HOME_TEMP = 'home-temp';
const HOME_WIND = 'home-wind';
const HOME_RAIN = 'home-rain';

const getButtonId = (ID, conditionIndex = 0) => {
	return screen.getAllByTestId(ID)[conditionIndex];
};

describe('Home Landing Page', () => {
	it('should render the city name', () => {
		renderComponent(initialProps);
		const cityName = getButtonId(HOME_CITY_NAME_ID);
		const { getByText } = within(cityName);
		const cityNameText = getByText('Madrid');
		expect(cityName).toBeInTheDocument();
		expect(cityNameText).toBeInTheDocument();
	});
	it('should render the city weather', () => {
		renderComponent(initialProps);
		const cityWeather = getButtonId(HOME_CITY_WEATHER);
		expect(cityWeather).toBeInTheDocument();
		const { getByText } = within(cityWeather);
		const cityWeatherText = getByText('despejado');
		expect(cityWeatherText).toBeInTheDocument();
	});
	it('should render the city date', () => {
		renderComponent(initialProps);
		const cityDate = getButtonId(HOME_DATE);
		expect(cityDate).toBeInTheDocument();
		const { getByText } = within(cityDate);
		const cityDateText = getByText('01-01-2000');
		expect(cityDateText).toBeInTheDocument();
	});
	it('should render the city temperature', () => {
		renderComponent(initialProps);
		const cityTemp = getButtonId(HOME_TEMP);
		expect(cityTemp).toBeInTheDocument();
		const { getByText } = within(cityTemp);
		const cityTempText = getByText(/22/i);
		expect(cityTempText).toBeInTheDocument();
	});
	it('should render the city wind', () => {
		renderComponent(initialProps);
		const cityWind = getButtonId(HOME_WIND);
		expect(cityWind).toBeInTheDocument();
		const { getByText } = within(cityWind);
		const cityWindText = getByText(/10/i);
		expect(cityWindText).toBeInTheDocument();
	});
	it('should render the city chance of rain', () => {
		renderComponent(initialProps);
		const cityRain = getButtonId(HOME_RAIN);
		expect(cityRain).toBeInTheDocument();
		const { getByText } = within(cityRain);
		const cityRainText = getByText(/50/i);
		expect(cityRainText).toBeInTheDocument();
	});
});
