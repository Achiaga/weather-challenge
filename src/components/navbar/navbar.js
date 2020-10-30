import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { updateModalState } from '../../features/modal-slice';
import { getWeatherStatus } from '../../features/weather-slice';
import NavbarButtons from './navbar-buttons';

const shouldDisplayNavbar = (route) => {
	return ['/no-register-user', '/sign-in', '/sign-up', '/profile'].includes(
		route.pathname
	);
};

const Navbar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { hasError } = useSelector(getWeatherStatus);
	const showModal = () => {
		dispatch(updateModalState(true, 'search'));
	};

	if (hasError) return null;
	if (shouldDisplayNavbar(location)) return null;

	return <NavbarButtons showModal={showModal} />;
};
export default Navbar;
