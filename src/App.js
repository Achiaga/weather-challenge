import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Home from './components/home';
import Modal from './components/modal';
import UserWeather from './components/user-weather';
import Profile from './components/user-settings';
import Navbar from './components/navbar';
import NoRegisterUser from './components/user-settings/no-register-user';
import SignUp from './components/user-settings/sign-up';
import SignIn from './components/user-settings/sign-in';

import { getUserInitialPayload, getIsUserAuth } from './features/user-slice';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth ? <Component /> : <Redirect to='/no-register-user' />
			}
		/>
	);
};

const App = () => {
	const dispatch = useDispatch();
	const auth = useSelector(getIsUserAuth);

	useEffect(() => {
		dispatch(getUserInitialPayload());
	}, []);

	return (
		<Router>
			<Navbar />
			<Modal modalType='search' />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/user-weather' component={UserWeather} />
				<PrivateRoute path='/profile' auth={auth} component={Profile} />
				<Route
					path='/no-register-user'
					auth={auth}
					component={NoRegisterUser}
				/>
				<Route path='/sign-in' component={SignIn} />
				<Route path='/sign-up' component={SignUp} />
			</Switch>
		</Router>
	);
};

export default App;
