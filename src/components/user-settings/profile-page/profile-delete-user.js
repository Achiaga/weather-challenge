import React from 'react';
import { EuiButton, EuiFlexItem } from '@elastic/eui';
import '../style/profile.css';

const ProfileDeleteUser = ({ handleDeleteUser }) => {
	return (
		<div className='profile-column'>
			<h1 className='profile-column-title'>Delete Account</h1>
			<EuiFlexItem grow={false}>
				<EuiButton fill color='danger' onClick={handleDeleteUser}>
					Delete Account
				</EuiButton>
			</EuiFlexItem>
		</div>
	);
};
export default ProfileDeleteUser;
