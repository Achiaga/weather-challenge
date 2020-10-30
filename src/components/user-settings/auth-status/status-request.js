import React from 'react';
import { EuiCallOut } from '@elastic/eui';

const StatusRequest = ({ status, title, errorMessage }) => {
	return (
		<div>
			<EuiCallOut
				title={`Rejected ${title}`}
				color={status === 'success' ? 'success' : 'danger'}
				iconType={status === 'success' ? 'user' : 'alert'}>
				<p>{errorMessage}</p>
			</EuiCallOut>
		</div>
	);
};
export default StatusRequest;
