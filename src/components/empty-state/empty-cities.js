import React from 'react';
import { EuiEmptyPrompt, EuiButton } from '@elastic/eui';
import './empty-state.css';

const EmptyCities = ({ handleAddCity }) => {
	return (
		<div className='empty-state-container'>
			<EuiEmptyPrompt
				iconType='dataVisualizer'
				iconColor={null}
				style={{ margin: 'inherit !important' }}
				title={<h2>You have no cities saved</h2>}
				titleSize='xs'
				body={
					<>
						<p>Start adding your cities</p>
					</>
				}
				actions={
					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<EuiButton onClick={handleAddCity} size='s' color='secondary' fill>
							Add City
						</EuiButton>
					</div>
				}
			/>
		</div>
	);
};
export default EmptyCities;
