import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	requestSignUp,
	requestSignIn,
	requestSignOut,
} from '../../features/user-slice';

const Wrapper = styled.div``;

const Component = () => {
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
		<div>
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
		</div>
	);
};
export default Component;
