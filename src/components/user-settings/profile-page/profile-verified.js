import React from 'react';
import { EuiBadge, EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import '../style/profile.css';

const ProfileVerified = ({ isVerified }) => {
	return (
		<EuiFlexGroup
			style={{ marginBottom: '2em' }}
			wrap
			responsive={false}
			gutterSize='xs'>
			<EuiFlexItem grow={false}>
				<EuiBadge color='secondary' isDisabled={!isVerified}>
					{isVerified ? 'Verified Email' : 'Not Verified Email'}
				</EuiBadge>
			</EuiFlexItem>
		</EuiFlexGroup>
	);
};
export default ProfileVerified;
