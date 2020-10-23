import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
	requestLocation,
	requestWeatherByLocation,
} from './features/weather-slice';
import {
	requestSignUp,
	requestSignIn,
	requestSignOut,
} from './features/auth-slice';
import SearchInput from './components/search/search-input';
import firebase from './firebase/firebase';
import UserRegister from './components/user/register';
import UserLogin from './components/user/login';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestLocation());
		// dispatch(requestWeatherByLocation());
		// dispatch(requestSignUp('a@gmail.com', '1234567'));
		// dispatch(requestSignUp('alfonsodiezachiaga@gmail.com', '1234567'));
		// dispatch(requestSignOut('a@gmail.com', '1234567'));
	});

	return (
		<>
			<SearchInput />
			<UserRegister />
			<UserLogin />
		</>
	);
}

export default App;
