import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { updateModalState } from '../../features/modal-slice';
import { getWeatherStatus } from '../../features/weather-slice';
import './navbar.css';

const shouldDisplayNavbar = (route) => {
	return ['/no-register-user', '/sign-in', '/sign-up', '/profile'].includes(
		route.pathname
	);
};

const Navbar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { isLoading, isSuccess, hasError } = useSelector(getWeatherStatus);
	const showModal = () => {
		dispatch(updateModalState(true, 'search'));
	};

	if (hasError) return null;
	if (shouldDisplayNavbar(location)) return null;

	return (
		<div className='wrapper-navbar'>
			<div className='nav-button'>
				<Link to='/'>
					<EuiIcon type='cloudSunny' size='xl' />
				</Link>
			</div>
			<div className='nav-button'>
				<EuiIcon onClick={showModal} type='search' size='xl' />
			</div>
			<div className='nav-button'>
				<Link to='/user-weather'>
					<EuiIcon type='editorUnorderedList' size='xl' />
				</Link>
			</div>
		</div>
	);
};
export default Navbar;
