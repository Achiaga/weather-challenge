import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../constants';
import parseAPIStatus from '../utils/parse-api-status';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isModalOpen: false,
		modalType: '',
		modalStatus: '',
	},
	reducers: {
		updateIsModalOpen: (state, action) => {
			state.isModalOpen = action.payload;
		},
		updateModalType: (state, action) => {
			state.modalType = action.payload;
		},
		updateModalStatus: (state, action) => {
			state.modalStatus = action.payload;
		},
	},
});

export const {
	updateIsModalOpen,
	updateModalType,
	updateModalStatus,
} = modalSlice.actions;

export const updateModalState = (modalState, modalType = '') => async (
	dispatch
) => {
	batch(() => {
		dispatch(updateIsModalOpen(modalState));
		dispatch(updateModalType(modalType));
	});
};

export const getIsModalOpen = (state) => state.modal.isModalOpen;
export const getModalType = (state) => state.modal.modalType;

export default modalSlice.reducer;
