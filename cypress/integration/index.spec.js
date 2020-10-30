const vistiUrl = () => {
	cy.server();
	cy.route('GET', '/api/json/v2/municipios', [
		{
			NOMBRE: 'Barcelona',
			CODPROV: '08',
			CODIGOINE: '08019',
		},
		{
			NOMBRE: 'Madrid',
			CODPROV: '28',
			CODIGOINE: '28079',
		},
		{
			NOMBRE: 'Sevilla',
			CODPROV: '41',
			CODIGOINE: '41091',
		},
	]);
	cy.route('GET', '/json', {
		city: 'Barcelona',
	});
	cy.visit('http://localhost:3000');
};

const getCityName = () => {
	return cy.dataQa('city-name');
};

const getSearchNavbar = () => {
	return cy.dataQa('search-navbar');
};

const getSearchModal = () => {
	return cy.dataQa('search-modal');
};

const getSearchModalInput = () => {
	return cy.dataQa('search-modal-input');
};
const getSearchModalCityWeatherButton = () => {
	return cy.dataQa('search-modal-city-weather-button');
};

describe('Home Landing Page', () => {
	beforeEach(() => {
		vistiUrl();
	});

	it('should display the name of the city based on your location', () => {
		getCityName().should('contain', 'Barcelona');
	});

	it('should open the search modal when clicked on the navbar ', () => {
		getSearchNavbar().click({ force: true });
		getSearchModalInput().type('Madrid').type('{downArrow}{enter}');
		getSearchModalCityWeatherButton().click({ force: true });
		getCityName().should('contain', 'Madrid');
	});
});
