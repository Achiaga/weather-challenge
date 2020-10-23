import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import weatherSlice from '../features/weather-slice';
import authSlice from '../features/auth-slice';

const middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

export default configureStore({
	reducer: {
		weather: weatherSlice,
		auth: authSlice,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware,
});
