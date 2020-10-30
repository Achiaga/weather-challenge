import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileHeader from './profile-page/profile-header';
import ProfileEmail from './profile-page/profile-email';
import ProfileVerified from './profile-page/profile-verified';
import ProfileChangePassword from './profile-page/profile-change-password';
import ProfileLogout from './profile-page/profile-logout';
import ProfileDeleteUser from './profile-page/profile-delete-user';
import './style/profile.css';

import {
	requestSignOut,
	getUserEmail,
	getIsUserVerified,
} from '../../features/user-slice';
import { updateModalState } from '../../features/modal-slice';

const Profile = () => {
	const dispatch = useDispatch();

	const email = useSelector(getUserEmail);
	const isVerified = useSelector(getIsUserVerified);

	const handlesSignOut = () => {
		dispatch(requestSignOut());
	};

	const handleDeleteUser = () => {
		dispatch(updateModalState(true, 'checkPassword'));
	};

	return (
		<div className='profile-container'>
			<ProfileHeader />
			<div className='profile-wrapper-container'>
				<div className='profile-wrapper-info'>
					<ProfileEmail email={email} />
					<ProfileVerified isVerified={isVerified} />
					<ProfileChangePassword />
					<ProfileLogout handlesSignOut={handlesSignOut} />
					<ProfileDeleteUser handleDeleteUser={handleDeleteUser} />
				</div>
			</div>
		</div>
	);
};
export default Profile;
