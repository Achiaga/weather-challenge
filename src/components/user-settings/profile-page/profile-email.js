import React from 'react';
import '../style/profile.css';

const ProfileEmail = ({ email }) => {
	return (
		<div className='profile-row'>
			<h1 className='profile-row-title' data-testid='email-id'>
				Email:
			</h1>
			<h4 className='profile-row-result' data-testid='email-value-id'>
				{email}
			</h4>
		</div>
	);
};
export default ProfileEmail;
