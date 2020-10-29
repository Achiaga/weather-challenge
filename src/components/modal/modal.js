import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateModalState,
	getIsModalOpen,
	getModalType,
} from '../../features/modal-slice';
import { EuiOverlayMask, EuiModal, EuiModalBody } from '@elastic/eui';
import Search from '../search';
import CheckPassword from '../user-settings/check-password';

const SearchModal = ({ closeModal }) => {
	return (
		<EuiOverlayMask onClick={closeModal}>
			<EuiModal style={{ zIndex: '99999' }} onClose={closeModal}>
				<EuiModalBody>
					<Search />
				</EuiModalBody>
			</EuiModal>
		</EuiOverlayMask>
	);
};

const CheckPasswordModal = ({ closeModal }) => {
	return (
		<EuiOverlayMask onClick={closeModal}>
			<EuiModal style={{ zIndex: '99999' }} onClose={closeModal}>
				<EuiModalBody>
					<CheckPassword />
				</EuiModalBody>
			</EuiModal>
		</EuiOverlayMask>
	);
};

const Modal = () => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(getIsModalOpen);
	const modalType = useSelector(getModalType);

	const closeModal = () => dispatch(updateModalState(false));

	const ModalComponent = {
		search: SearchModal,
		checkPassword: CheckPasswordModal,
	}[modalType];

	if (!isModalOpen) return null;
	return <ModalComponent closeModal={closeModal} />;
};

export default Modal;
