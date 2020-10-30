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
	requestDeleteUser,
	getDeleteUserStatus,
} from '../../../features/user-slice';
import MiniLoading from '../../loading/mini-loading';
import StatusRequest from '../auth-status/status-request';

const CheckPassword = () => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState('');

	const email = useSelector(getUserEmail);
	const { isLoading, hasError } = useSelector(getDeleteUserStatus);
	const title = 'Delete Account Error';
	const errorMessage = 'Failed to delete user account';

	const handleInput = (e) => {
		const { value } = e.target;
		setPassword(value);
	};

	const handleDeleteUser = () => {
		dispatch(requestDeleteUser(email, password));
	};

	if (isLoading) return <MiniLoading />;

	return (
		<div>
			{hasError && (
				<StatusRequest
					status={'error'}
					title={title}
					errorMessage={errorMessage}
				/>
			)}
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
					<EuiFormRow className='sign-button-container' hasEmptyLabelSpace>
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
