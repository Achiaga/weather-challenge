import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { requestWeatherByLocation } from '../../features/weather-slice';
import { getCitiesSaved } from '../../features/user-slice';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	border-bottom: 1px solid black;
`;

const Title = styled.h1`
	font-size: 25px;
	padding: 1em 0;
`;

const Profile = styled.div`
	position: absolute;
	right: 13px;
	top: 15%;
	border: 1px solid black;
	border-radius: 50%;
	padding: 10px;
	a {
		text-decoration: none;
		color: #5a5a5a;
		svg {
			color: black;
		}
	}
`;

const UserWeather = () => {
	const dispatch = useDispatch();

	const citiesSaved = useSelector(getCitiesSaved);

	useEffect(() => {
		dispatch(requestWeatherByLocation(citiesSaved));
	}, [citiesSaved]);

	return (
		<Wrapper>
			<Header>
				<Title>My Weather</Title>
				<Profile>
					<Link to='/profile'>
						<EuiIcon type='user' size='l' />
					</Link>
				</Profile>
			</Header>
		</Wrapper>
	);
};
export default UserWeather;
