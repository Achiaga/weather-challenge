import React from 'react';
import { Link } from 'react-router-dom';
import { EuiTitle, EuiIcon, EuiFlexItem, EuiButton } from '@elastic/eui';
import '../style/profile.css';

const NoRegisterUser = () => {
	return (
		<div className='profile-container'>
			<Link to='/user-weather'>
				<EuiIcon style={{ margin: '1em' }} type='returnKey' size='xxl' />
			</Link>
			<div
				style={{
					backgroundColor: 'white',
					textAlign: 'center',
					paddingTop: '7em',
					minHeight: '100vh',
				}}>
				<EuiTitle size='l'>
					<h3>Welcome,</h3>
				</EuiTitle>
				<EuiTitle size='m'>
					<h5>access the full power of the app </h5>
				</EuiTitle>
				<EuiTitle size='s'>
					<p>Register Now</p>
				</EuiTitle>
				<p>Now Spam. 100% Secure</p>
				<EuiFlexItem
					grow={false}
					style={{ maxWidth: '40%', margin: 'auto', marginTop: '3em' }}>
					<Link to='/sign-in'>
						<EuiButton>Sign In</EuiButton>
					</Link>
				</EuiFlexItem>
				<EuiTitle size='s' style={{ padding: '1em 0' }}>
					<p>- OR -</p>
				</EuiTitle>
				<EuiFlexItem grow={false} style={{ maxWidth: '40%', margin: 'auto' }}>
					<Link to='/sign-up'>
						<EuiButton>Sign Up</EuiButton>
					</Link>
				</EuiFlexItem>
			</div>
		</div>
	);
};
export default NoRegisterUser;
