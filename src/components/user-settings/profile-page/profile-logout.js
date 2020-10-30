import React from 'react';
import { EuiButton, EuiFlexItem } from '@elastic/eui';
import '../style/profile.css';

const ProfileLogout = ({ handlesSignOut }) => {
	return (
		<div className='profile-column'>
			<h1 className='profile-column-title'>Logout</h1>
			<EuiFlexItem grow={false}>
				<EuiButton onClick={handlesSignOut}>Logout</EuiButton>
			</EuiFlexItem>
		</div>
	);
};
export default ProfileLogout;
