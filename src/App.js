import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Modal from './components/modal';
import UserWeather from './components/user-weather';
import Profile from './components/user-settings';
import Navbar from './components/navbar';

import { requestGetUser } from './features/user-slice';
import { requestCity } from './features/weather-slice';
import {} from './features/modal-slice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		batch(() => {
			dispatch(requestCity());
			dispatch(requestGetUser());
		});
	});

	return (
		<Router>
			<Navbar />
			<Modal modalType='search' />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/user-weather' component={UserWeather} />
				<Route path='/profile' component={Profile} />
			</Switch>
		</Router>
	);
}

export default App;
