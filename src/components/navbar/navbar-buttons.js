import React from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import './navbar.css';

const NavbarButtons = ({ showModal }) => {
	return (
		<div className='wrapper-navbar'>
			<div className='nav-button'>
				<Link to='/'>
					<EuiIcon data-testid='home-button-id' type='cloudSunny' size='xl' />
				</Link>
			</div>
			<div className='nav-button'>
				<EuiIcon
					data-testid='search-button-id'
					onClick={showModal}
					type='search'
					size='xl'
				/>
			</div>
			<div className='nav-button'>
				<Link to='/user-weather'>
					<EuiIcon
						data-testid='user-weather-button-id'
						type='editorUnorderedList'
						size='xl'
					/>
				</Link>
			</div>
		</div>
	);
};
export default NavbarButtons;
