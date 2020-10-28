import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalState, getIsModalOpen } from '../../features/modal-slice';
import { getUserId } from '../../features/user-slice';
import { EuiOverlayMask, EuiModal, EuiModalBody } from '@elastic/eui';
import Search from '../search';
import NoRegisterUser from '../user-settings/no-register-user';

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

const Modal = ({ modalType }) => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(getIsModalOpen);

	const closeModal = () => dispatch(updateModalState(false));

	const ModalComponent = {
		search: SearchModal,
	}[modalType];

	if (!isModalOpen) return null;
	return <ModalComponent closeModal={closeModal} />;
};

export default Modal;
