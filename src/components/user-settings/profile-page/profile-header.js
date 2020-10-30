import React from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';

const ProfileHeader = () => {
	return (
		<>
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
		</>
	);
};
export default ProfileHeader;
