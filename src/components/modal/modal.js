import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalState, getIsModalOpen } from '../../features/modal-slice';
import {
	EuiOverlayMask,
	EuiModal,
	EuiButton,
	EuiModalBody,
	EuiIcon,
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import Search from '../search';

const Wrapper = styled.div``;

const SearchModal = ({ closeModal }) => {
	return (
		<EuiOverlayMask onClick={closeModal}>
			<EuiModal onClose={closeModal}>
				<EuiModalBody>
					<Search />
				</EuiModalBody>
			</EuiModal>
		</EuiOverlayMask>
	);
};

const Modal = ({ modalType }) => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(getIsModalOpen);

	const closeModal = () => dispatch(updateModalState(false));

	const openModal = () => dispatch(updateModalState(true));

	const ModalComponent = {
		search: SearchModal,
	}[modalType];

	if (!isModalOpen) return null;
	return <ModalComponent closeModal={closeModal} />;
};

export default Modal;
