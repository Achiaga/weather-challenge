import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	requestLocation,
	requestWeatherByLocation,
} from './features/weather-slice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(requestLocation());
		dispatch(requestWeatherByLocation());
	});

	return (
		<div>
			<h1>test weather</h1>
		</div>
	);
}

export default App;
