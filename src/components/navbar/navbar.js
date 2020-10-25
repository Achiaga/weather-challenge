import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 1em 0;
`;

const NavButton = styled.div`
	color: black;
	a {
		text-decoration: none;
		color: black;
	}
`;

const Component = () => {
	return (
		<Wrapper>
			<NavButton>
				<Link to='/'>Home</Link>
			</NavButton>
			<NavButton>
				<Link to='/search'>Search</Link>
			</NavButton>
			<NavButton>
				<Link to='/user-weather'>Profile</Link>
			</NavButton>
		</Wrapper>
	);
};
export default Component;
