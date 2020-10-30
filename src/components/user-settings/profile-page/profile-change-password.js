import React from 'react';
import { EuiButton, EuiFlexItem } from '@elastic/eui';
import '../style/profile.css';

const ProfileChangePassword = () => {
	return (
		<div className='profile-column'>
			<h1 className='profile-column-title'>Change Password</h1>
			<EuiFlexItem grow={false}>
				<EuiButton isDisabled={true} onClick={() => {}}>
					Change password
				</EuiButton>
			</EuiFlexItem>
		</div>
	);
};
export default ProfileChangePassword;
