import React from 'react';
import './loading.css';

const LoadingPage = () => {
	return (
		<div className='loading-wrapper'>
			<div className='multi-spinner-container'>
				<div className='multi-spinner'>
					<div className='multi-spinner'>
						<div className='multi-spinner'>
							<div className='multi-spinner'>
								<div className='multi-spinner'>
									<div className='multi-spinner'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoadingPage;
