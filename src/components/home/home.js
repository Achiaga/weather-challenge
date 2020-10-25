import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
	requestLocation,
	requestWeatherByLocation,
} from '../../features/weather-slice';

const Wrapper = styled.div``;

const Component = () => {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};
export default Component;
