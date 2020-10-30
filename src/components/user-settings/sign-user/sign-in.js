import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	requestSignIn,
	getSignInStatus,
	getSignUserError,
} from '../../../features/user-slice';
import SignUser from './sign-user';
import SuccessSignUser from '../auth-status/success-sign-user';
import StatusRequest from '../auth-status/status-request';

const SignIn = () => {
	const dispatch = useDispatch();
	const { isLoading, isSuccess, hasError } = useSelector(getSignInStatus);
	const errorMessage = useSelector(getSignUserError);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const title = 'Sign in';
	const descrip = 'Get access to your favorite cities!';

	const handleInput = (e) => {
		const { value, name } = e.target;
		if (name === 'email') return setEmail(value);
		return setPassword(value);
	};

	const handleSignIn = () => {
		dispatch(requestSignIn(email, password));
	};

	if (isSuccess) return <SuccessSignUser title={title} />;

	return (
		<>
			{hasError && (
				<StatusRequest
					status={'error'}
					title={title}
					errorMessage={errorMessage}
				/>
			)}
			<SignUser
				title={title}
				desc={descrip}
				email={email}
				password={password}
				handleInput={handleInput}
				handleSignUser={handleSignIn}
			/>
		</>
	);
};

export default SignIn;
