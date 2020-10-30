import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import NavbarButtons from './navbar-buttons';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderComponent = (props) => {
	const history = createMemoryHistory();
	return render(
		<Router history={history}>
			<NavbarButtons {...props} />
		</Router>
	);
};

// const initialProps = {
// 	listCategories: ['animal', 'unicorn', 'dragon'],
// 	selectedCategory: 'dragon',
// };

const HOME_BUTTON_ID = 'home-button-id';
const SEARCH_BUTTON_ID = 'search-button-id';
const USER_WEATHER_BUTTON_ID = 'user-weather-button-id';

const getButtonId = (ID, conditionIndex = 0) => {
	return screen.getAllByTestId(ID)[conditionIndex];
};

describe('category selector', () => {
	it('should render a the navbar home button', () => {
		renderComponent();
		const homeButton = getButtonId(HOME_BUTTON_ID);
		expect(homeButton).toBeInTheDocument();
	});
	it('should render a the navbar search button', () => {
		renderComponent();
		const searchButton = getButtonId(SEARCH_BUTTON_ID);
		expect(searchButton).toBeInTheDocument();
	});
	it('should fire the function open modal when clicked at the navbar search button', () => {
		const openModal = jest.fn();
		renderComponent({ openModal });
		const searchButton = getButtonId(SEARCH_BUTTON_ID);
		fireEvent.click(searchButton);
		expect(openModal).toHaveBeenCalled();
	});
	it('should render a the navbar user-weather button', () => {
		renderComponent();
		const userWeatherButton = getButtonId(USER_WEATHER_BUTTON_ID);
		expect(userWeatherButton).toBeInTheDocument();
	});
});
