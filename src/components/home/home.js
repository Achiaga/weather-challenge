import React, { useEffect } from 'react';
import styled from 'styled-components';
import { EuiTitle } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';

import {
	requestLocation,
	getCityStatus,
	requestWeatherByLocation,
} from '../../features/weather-slice';

import homeBg from '../../assets/rain.png';
import homeBg2 from '../../assets/sun.png';

const Wrapper = styled.div`
	height: 100vh;
	background: #2980b9; /* fallback for old browsers */
	background: linear-gradient(
		to bottom,
		#a3e7ff,
		#55d2ff,
		#74cafd
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	color: white;
`;

const Title = styled.h1`
	font-size: 60px;
	text-align: center;
	padding-top: 0.6em;
`;

const Rain = styled.h2`
	font-size: 20px;
	text-align: center;
	padding-top: 1em;
`;

const Temperature = styled.h2`
	font-size: 150px;
	text-align: center;
	padding-left: 10%;
`;

const ImgWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 0.5em;
`;

const Img = styled.img`
	width: 10em;
	filter: drop-shadow(12px 8px 12px rgba(0, 0, 0, 0.35));
`;

const DetailsWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	padding: 15px 0;
`;

const Wind = styled.h4`
	font-size: 22px;
	padding: 10px 0;
`;

const Humity = styled.h4`
	font-size: 22px;
	padding: 10px 0;
`;

const Date = styled.h4`
	font-size: 23px;
	display: flex;
	justify-content: center;
	padding-top: 1.2em;
`;

const Home = () => {
	const dispatch = useDispatch();

	// const { isSuccess } = useSelector(getCityStatus);

	// const getWeather = () => {
	// 	if (isSuccess) dispatch(requestWeatherByLocation('Barcelona'));
	// };

	return (
		<Wrapper>
			<Title>Burgos</Title>
			<Rain>Soleado</Rain>
			<ImgWrapper>
				<Img src={homeBg2} alt='home-bg' />
			</ImgWrapper>
			<Temperature>25°</Temperature>
			<DetailsWrapper>
				<div>
					<Wind>Wind</Wind>
					<Wind>16 km/h</Wind>
				</div>
				<div>
					<Humity>Humity</Humity>
					<Humity>59%</Humity>
				</div>
			</DetailsWrapper>
			<Date>26-10-2020</Date>
		</Wrapper>
	);
};
export default Home;
