import React from 'react';
import { EuiEmptyPrompt, EuiButton } from '@elastic/eui';
import { Link } from 'react-router-dom';
import './empty-state.css';

const Component = () => {
	return (
		<div className='empty-state-container'>
			<EuiEmptyPrompt
				iconType='dataVisualizer'
				iconColor={null}
				title={<h2>You have no cities saved</h2>}
				titleSize='xs'
				body={
					<>
						<p>
							In order to save your favorite cities, you need to register. Then,
							you can save your favorites cities and see the city's weather
							whenever you want.
						</p>
					</>
				}
				actions={
					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<Link to='/sign-up'>
							<EuiButton size='s' color='secondary' fill>
								Sign Up
							</EuiButton>
						</Link>
						<Link to='/sign-in'>
							<EuiButton size='s' color='secondary' fill>
								Sign In
							</EuiButton>
						</Link>
					</div>
				}
			/>
		</div>
	);
};
export default Component;
