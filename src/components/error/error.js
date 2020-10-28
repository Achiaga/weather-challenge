import React from 'react';
import './error.css';

const ErrorPage = () => {
	return (
		<div className='error-wrapper'>
			<div className='rainy'></div>
			<div className='error-message'>
				<h2>Page Error</h2>
				<p>Please Try Again Later!</p>
			</div>
		</div>
	);
};
export default ErrorPage;
