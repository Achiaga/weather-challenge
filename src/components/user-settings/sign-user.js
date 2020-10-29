import React from 'react';
import { Link } from 'react-router-dom';
import {
	EuiIcon,
	EuiTitle,
	EuiFlexGroup,
	EuiFlexItem,
	EuiFormRow,
	EuiButton,
	EuiFieldText,
	EuiFieldPassword,
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import './profile.css';

const SignUser = ({
	title,
	descrip,
	handleInput,
	handleSignUser,
	email,
	password,
}) => {
	return (
		<div className='profile-container '>
			<Link to='/'>
				<EuiIcon style={{ margin: '1em' }} type='returnKey' size='xxl' />
			</Link>
			<EuiTitle size='l'>
				<h1 style={{ textAlign: 'center' }}>{title}</h1>
			</EuiTitle>
			<EuiFlexGroup style={{ margin: 'auto', maxWidth: '80%' }}>
				<EuiFlexItem>
					<EuiFormRow label='Email' helpText={descrip}>
						<EuiFieldText
							type='email'
							placeholder='Enter your email'
							value={email}
							name='email'
							onChange={handleInput}
						/>
					</EuiFormRow>
				</EuiFlexItem>
				<EuiFlexItem>
					<EuiFormRow label='Password'>
						<EuiFieldPassword
							placeholder='Enter your password'
							type={'dual'}
							value={password}
							onChange={handleInput}
							aria-label='Use aria labels when no actual label is in use'
						/>
					</EuiFormRow>
				</EuiFlexItem>
				<EuiFlexItem grow={false}>
					<EuiFormRow style={{ margin: 'auto' }} hasEmptyLabelSpace>
						<EuiButton onClick={handleSignUser}>{title}</EuiButton>
					</EuiFormRow>
				</EuiFlexItem>
			</EuiFlexGroup>
		</div>
	);
};
export default SignUser;
