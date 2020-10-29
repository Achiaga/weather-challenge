import React from 'react';
import './mini-loading.css';

const MiniLoading = () => {
	return (
		<div className='mesh-loader'>
			<div className='set-one'>
				<div className='circle'></div>
				<div className='circle'></div>
			</div>
			<div className='set-two'>
				<div className='circle'></div>
				<div className='circle'></div>
			</div>
		</div>
	);
};
export default MiniLoading;
