import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	EuiIcon,
	EuiButton,
	EuiBadge,
	EuiFlexItem,
	EuiFlexGroup,
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	requestSignOut,
	getUserEmail,
	requestDeleteUser,
} from '../../features/user-slice';
import './profile.css';

const Profile = () => {
	const dispatch = useDispatch();

	const email = useSelector(getUserEmail);

	const handlesSignOut = () => {
		dispatch(requestSignOut());
	};

	const handleDeleteUser = () => {
		dispatch(requestDeleteUser());
	};

	return (
		<div className='profile-container'>
			<Link to='/user-weather'>
				<EuiIcon
					style={{ margin: '1em', color: 'black' }}
					type='returnKey'
					size='xxl'
				/>
			</Link>
			<div className='profile-wrapper-title'>
				<h1 className='profile-title'>Profile</h1>
			</div>
			<div className='profile-wrapper'>
				<div className='profile-row'>
					<h1 className='profile-row-title'>Email:</h1>
					<h4 className='profile-row-result'>{email}</h4>
				</div>
				<EuiFlexGroup
					style={{ marginBottom: '2em' }}
					wrap
					responsive={false}
					gutterSize='xs'>
					<EuiFlexItem grow={false}>
						<EuiBadge color='secondary' isDisabled={true}>
							Not Verified Email
						</EuiBadge>
					</EuiFlexItem>
				</EuiFlexGroup>
				<div className='profile-column'>
					<h1 className='profile-column-title'>Change Password</h1>
					<EuiFlexItem grow={false}>
						<EuiButton onClick={() => {}}>Change password</EuiButton>
					</EuiFlexItem>
				</div>
				<div className='profile-column'>
					<h1 className='profile-column-title'>Logout</h1>
					<EuiFlexItem grow={false}>
						<EuiButton onClick={handlesSignOut}>Logout</EuiButton>
					</EuiFlexItem>
				</div>
				<div className='profile-column'>
					<h1 className='profile-column-title'>Delete Account</h1>
					<EuiFlexItem grow={false}>
						<EuiButton fill color='danger' onClick={handleDeleteUser}>
							Delete Account
						</EuiButton>
					</EuiFlexItem>
				</div>
			</div>
		</div>
	);
};
export default Profile;
