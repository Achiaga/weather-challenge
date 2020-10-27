import React, { useState } from 'react';
import styled from 'styled-components';
import SearchInput from './search-input';
import { useSelector } from 'react-redux';
import { getAllCities } from '../../features/weather-slice';
import { getUserId } from '../../features/user-slice';

const Wrapper = styled.div``;

const Search = () => {
	const cities = useSelector(getAllCities);
	const userID = useSelector(getUserId);

	return <SearchInput cities={cities} userID={userID} />;
};
export default Search;
