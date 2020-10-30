import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isModalOpen: false,
		modalType: '',
	},
	reducers: {
		updateIsModalOpen: (state, action) => {
			state.isModalOpen = action.payload.modalState;
			state.modalType = action.payload.modalType;
		},
	},
});

export const { updateIsModalOpen } = modalSlice.actions;

export const updateModalState = (modalState, modalType = '') => async (
	dispatch
) => {
	dispatch(updateIsModalOpen({ modalState, modalType }));
};

export const getIsModalOpen = (state) => state.modal.isModalOpen;
export const getModalType = (state) => state.modal.modalType;

export default modalSlice.reducer;
