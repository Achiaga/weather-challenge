import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	EuiIcon,
	EuiTitle,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiButton,
	EuiFieldPassword,
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import {
	getUserEmail,
	requestSignIn,
	requestDeleteUser,
	getSignInStatus,
} from '../../features/user-slice';

const CheckPassword = () => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState('');
	const [deleteUser, setDeleteUser] = useState(false);

	const email = useSelector(getUserEmail);
	const { isSuccess } = useSelector(getSignInStatus);

	const handleInput = (e) => {
		const { value } = e.target;
		setPassword(value);
	};

	const handleDeleteUser = () => {
		dispatch(requestSignIn(email, password));
		setDeleteUser(true);
	};

	if (deleteUser && isSuccess) dispatch(requestDeleteUser());

	return (
		<div>
			<Link to='/profile'>
				<EuiIcon style={{ margin: '1em' }} type='returnKey' size='xxl' />
			</Link>
			<EuiTitle size='l'>
				<h1 style={{ textAlign: 'center' }}>Rewrite your Password</h1>
			</EuiTitle>
			<EuiFlexGroup style={{ margin: 'auto', maxWidth: '80%' }}>
				<EuiFlexItem>
					<EuiFormRow label='Password'>
						<EuiFieldPassword
							placeholder='Enter your password'
							type={'dual'}
							value={password}
							onChange={handleInput}
							aria-label='Use aria labels when no actual label is in use'
						/>
					</EuiFormRow>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFormRow style={{ margin: 'auto' }} hasEmptyLabelSpace>
						<EuiButton color='danger' onClick={handleDeleteUser}>
							Delete Account
						</EuiButton>
					</EuiFormRow>
				</EuiFlexItem>
			</EuiFlexGroup>
		</div>
	);
};
export default CheckPassword;
