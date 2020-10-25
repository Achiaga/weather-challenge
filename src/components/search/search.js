import React from 'react';
import styled from 'styled-components';
import SearchInput from './search-input';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities, getAllTowns } from '../../features/weather-slice';
import { getUserId } from '../../features/user-slice';

const Wrapper = styled.div``;

const Search = () => {
	const dispatch = useDispatch();
	const cities = useSelector(getAllCities);
	const towns = useSelector(getAllTowns);
	const userID = useSelector(getUserId);

	return (
		<div>
			<SearchInput cities={cities} towns={towns} userID={userID} />
		</div>
	);
};
export default Search;
