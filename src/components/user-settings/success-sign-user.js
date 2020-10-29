import React from 'react';
import {
	EuiCallOut,
	EuiIcon,
	EuiTitle,
	EuiFlexItem,
	EuiFormRow,
	EuiButton,
} from '@elastic/eui';
import { Link } from 'react-router-dom';
import './profile.css';

const SuccessSignUser = ({ title }) => {
	return (
		<div className='profile-container '>
			<Link to='/'>
				<EuiIcon style={{ margin: '1em' }} type='returnKey' size='xxl' />
			</Link>
			<EuiTitle size='l'>
				<h1 style={{ textAlign: 'center', marginBottom: '1em' }}>{title}</h1>
			</EuiTitle>
			<EuiCallOut
				title={`You succesfully ${title}!`}
				color='success'
				iconType='user'>
				<p>{'Congratulations. Now you can save your favorites cities! :) '}</p>
			</EuiCallOut>
			<EuiTitle style={{ marginTop: '1.5em', textAlign: 'center' }} size='s'>
				<h1 style={{ textAlign: 'center' }}>
					Go back to the App and try the new features!
				</h1>
			</EuiTitle>
			<EuiFlexItem grow={false}>
				<EuiFormRow
					style={{ margin: 'auto', marginTop: '1em' }}
					hasEmptyLabelSpace>
					<Link to='/profile'>
						<EuiButton>Go Back</EuiButton>
					</Link>
				</EuiFormRow>
			</EuiFlexItem>
		</div>
	);
};
export default SuccessSignUser;
