import React, { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import SearchInput from './components/search';
import UserWeather from './components/user-weather';
import Navbar from './components/navbar';
import {
	requestCheckPersistantUser,
	requestSavedCities,
} from './features/user-slice';
import { requestLocation } from './features/weather-slice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		batch(() => {
			dispatch(requestLocation());
			dispatch(requestCheckPersistantUser());
		});
		// dispatch(requestSavedCities());
	});

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/search' component={SearchInput} />
				<Route path='/user-weather' component={UserWeather} />
				{/* <Route path="/account-settings" component={AccountSettings} /> */}
			</Switch>
		</Router>
	);
}

export default App;
