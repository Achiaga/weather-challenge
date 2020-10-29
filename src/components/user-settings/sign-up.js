import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	requestSignUp,
	getSignUpStatus,
	getSignUserError,
} from '../../features/user-slice';
import SignUser from './sign-user';
import SuccessSignUser from './success-sign-user';
import ErrorSignUser from './error-sign-user';

const SignUp = () => {
	const dispatch = useDispatch();
	const { isLoading, isSuccess, hasError } = useSelector(getSignUpStatus);
	const errorMessage = useSelector(getSignUserError);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const title = 'Sign up';
	const descrip = 'No spam. Not now, not ever. :) | 100% secure';

	const handleInput = (e) => {
		const { value, name } = e.target;
		if (name === 'email') return setEmail(value);
		return setPassword(value);
	};

	const handleSignUp = () => {
		dispatch(requestSignUp(email, password));
	};

	if (isSuccess) return <SuccessSignUser title={title} />;

	return (
		<>
			{hasError && <ErrorSignUser title={title} errorMessage={errorMessage} />}
			<SignUser
				title={title}
				desc={descrip}
				email={email}
				password={password}
				handleInput={handleInput}
				handleSignUser={handleSignUp}
			/>
		</>
	);
};

export default SignUp;
