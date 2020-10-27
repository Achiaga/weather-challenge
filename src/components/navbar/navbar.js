import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EuiIcon } from '@elastic/eui';
import { useDispatch } from 'react-redux';
import { updateModalState } from '../../features/modal-slice';
import '@elastic/eui/dist/eui_theme_light.css';

const Wrapper = styled.div`
	position: absolute;
	bottom: 5%;
	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 0.3em 0;
	border: 2px solid transparent;
	border-radius: 25px;
	width: 60%;
	background-color: white;
	box-shadow: 0 2px 6px rgba(13, 23, 75, 0.25);
`;

const NavButton = styled.div`
	cursor: pointer;
	border-radius: 50%;
	padding: 0.5em;
	transition: background-color 0.5s ease;
	&:hover {
		background: #afddff;
	}
	a {
		text-decoration: none;
		color: #5a5a5a;
	}
`;

const Navbar = () => {
	const dispatch = useDispatch();

	const showModal = () => {
		dispatch(updateModalState(true));
	};

	return (
		<>
			<Wrapper>
				<NavButton>
					<Link to='/'>
						<EuiIcon type='cloudSunny' size='xl' />
					</Link>
				</NavButton>
				<NavButton>
					<EuiIcon onClick={showModal} type='search' size='xl' />
				</NavButton>
				<NavButton>
					<Link to='/user-weather'>
						<EuiIcon type='editorUnorderedList' size='xl' />
					</Link>
				</NavButton>
			</Wrapper>
		</>
	);
};
export default Navbar;
