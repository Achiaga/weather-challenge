import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
	requestLocation,
	requestWeatherByLocation,
} from '../../features/weather-slice';
import {
	requestSignUp,
	requestSignIn,
	requestSignOut,
} from '../../features/user-slice';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h3 {
		padding: 1em 0;
	}
`;

const UserWeather = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmail = (e) => {
		const { value } = e.target;
		setEmail(value);
	};

	const handlePassword = (e) => {
		const { value } = e.target;
		setPassword(value);
	};

	const handleSignUp = () => {
		dispatch(requestSignUp('alfonsodiezachiaga@gmail.com', '1234567'));
	};

	const handleSignIn = () => {
		dispatch(requestSignIn('alfonso.achiaga@gmail.com', '1234567'));
	};

	const handlesSignOut = () => {
		dispatch(requestSignOut());
	};

	return (
		<Wrapper>
			{!user ? <h3>Login to see your weather list</h3> : user.email}
			<input onChange={handleEmail} />
			<br />
			<input onChange={handlePassword} />
			<br />
			<button onClick={handleSignUp}>Sign Up</button>
			<br />
			<input onChange={handleEmail} />
			<br />
			<input onChange={handlePassword} />
			<br />
			<button onClick={handleSignIn}>Login</button>
			<br />
			<button onClick={handlesSignOut}>Log out</button>
			<br />
		</Wrapper>
	);
};
export default UserWeather;
