import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import FavCitiesCard from './fav-cities-card';

const renderComponent = (props) => {
	return render(<FavCitiesCard {...props} />);
};

const initialProps = {
	cityWeather: {
		municipio: { NOMBRE: 'Madrid' },
		temperatura_actual: '22',
	},
};

const CITY_NAME_ID = 'fav-city-name-id';
const CITY_TEMP_ID = 'fav-city-temp-id';

const getButtonId = (ID, conditionIndex = 0) => {
	return screen.getAllByTestId(ID)[conditionIndex];
};

describe('Favotites cities list', () => {
	it('should render the correct city name of the city card', () => {
		const handleDeleteCity = jest.fn();
		const handleUpdateMainCity = jest.fn();
		renderComponent({
			...initialProps,
			handleDeleteCity,
			handleUpdateMainCity,
		});
		const cityName = getButtonId(CITY_NAME_ID);
		const { getByText } = within(cityName);
		const cityNameText = getByText('Madrid');
		expect(cityName).toBeInTheDocument();
		expect(cityNameText).toBeInTheDocument();
	});
	it('should render the correct city temperature of the city card', () => {
		const handleDeleteCity = jest.fn();
		const handleUpdateMainCity = jest.fn();
		renderComponent({
			...initialProps,
			handleDeleteCity,
			handleUpdateMainCity,
		});
		const cityTemp = getButtonId(CITY_TEMP_ID);
		const { getByText } = within(cityTemp);
		const cityTempText = getByText(/22/i);
		expect(cityTemp).toBeInTheDocument();
		expect(cityTempText).toBeInTheDocument();
	});
});
