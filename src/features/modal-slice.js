import { createSlice } from '@reduxjs/toolkit';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isModalOpen: false,
		modalStatus: '',
	},
	reducers: {
		updateIsModalOpen: (state, action) => {
			state.isModalOpen = action.payload;
		},
		updateModalStatus: (state, action) => {
			state.modalStatus = action.payload;
		},
	},
});

export const { updateIsModalOpen, updateModalStatus } = modalSlice.actions;

export const updateModalState = (modalState) => async (dispatch) => {
	dispatch(updateIsModalOpen(modalState));
};

export const getIsModalOpen = (state) => state.modal.isModalOpen;
// export const getModalVisibilityState = (state) =>
// 	getIsModalOpen(state).modalStatus;

export default modalSlice.reducer;
