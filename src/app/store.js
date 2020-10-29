import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import weatherSlice from '../features/weather-slice';
import userSlice from '../features/user-slice';
import modalSlice from '../features/modal-slice';

const middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

export default configureStore({
	reducer: {
		weather: weatherSlice,
		user: userSlice,
		modal: modalSlice,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware,
});
