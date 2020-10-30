import React from 'react';
import '../style/profile.css';

const ProfileEmail = ({ email }) => {
	return (
		<div className='profile-row'>
			<h1 className='profile-row-title'>Email:</h1>
			<h4 className='profile-row-result'>{email}</h4>
		</div>
	);
};
export default ProfileEmail;
