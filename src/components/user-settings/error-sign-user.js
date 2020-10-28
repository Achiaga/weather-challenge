import React from 'react';
import { EuiCallOut } from '@elastic/eui';

const ErrorSignUser = ({ title, errorMessage }) => {
	return (
		<div>
			<EuiCallOut title={`Rejected ${title}`} color='danger' iconType='alert'>
				<p>{errorMessage}</p>
			</EuiCallOut>
		</div>
	);
};
export default ErrorSignUser;
