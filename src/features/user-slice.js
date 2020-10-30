import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import parseAPIStatus from '../utils/parse-api-status';
import { LOADING, SUCCESS, ERROR } from '../constants';
import {
	createUser,
	signInUser,
	signOutUser,
	addPersistantAuth,
	deleteUser,
	emailVerification,
	checkPersistantUser,
} from '../utils/auth';
import { fetchCities } from '../utils/transporter';
import { addUserData, readUserData } from '../utils/database';
import {
	requestInitialLocationWeather,
	requestAndSaveCities,
	updateWeatherStatus,
} from './weather-slice';
import { updateModalState } from './modal-slice';

const initialState = {
	userId: '',
	email: '',
	city: '',
	citiesSaved: [],
	signUpStatus: '',
	signInStatus: '',
	signUserError: '',
	signOutStatus: '',
	saveUserDataStatus: '',
	addUserDataStatus: '',
	savedCitiesStatus: '',
	deleteUserStatus: '',
	isAuth: true,
	isUserVerified: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserInfo: (state, action) => {
			state.userId = action.payload.userId;
			state.isAuth = !!action.payload.userId;
			state.email = action.payload.email;
		},
		upateUserIsAuth: (state, action) => {
			state.isAuth = action.payload.userId;
		},
		updateIsUserVerified: (state, action) => {
			state.isUserVerified = action.payload;
		},
		updateCitiesSaved: (state, action) => {
			state.citiesSaved = action.payload;
		},
		updateSignUpStatus: (state, action) => {
			state.signUpStatus = action.payload;
		},
		updateSignInStatus: (state, action) => {
			state.signInStatus = action.payload;
		},
		updateSignOutStatus: (state, action) => {
			state.signOutStatus = action.payload;
		},
		updateSaveUserDataStatus: (state, action) => {
			state.saveUserDataStatus = action.payload;
		},
		updateAddCityFirebaseStatus: (state, action) => {
			state.addUserDataStatus = action.payload;
		},
		updateSavedCitiesStatus: (state, action) => {
			state.savedCitiesStatus = action.payload;
		},
		updateDeleteUserStatus: (state, action) => {
			state.deleteUserStatus = action.payload;
		},
		updateSignUserError: (state, action) => {
			state.signUserError = action.payload;
		},
		updateEmptyState: (state, action) => {
			state = initialState;
		},
		updateEmptyState: (state, action) => {
			state.userId = '';
			state.email = '';
			state.city = '';
			state.citiesSaved = [];
			state.signUpStatus = '';
			state.signInStatus = '';
			state.signUserError = '';
			state.signOutStatus = '';
			state.saveUserDataStatus = '';
			state.addUserDataStatus = '';
			state.savedCitiesStatus = '';
			state.deleteUserStatus = '';
			state.isAuth = false;
			state.isUserVerified = false;
		},
	},
});

export const {
	addUserInfo,
	updateCitiesSaved,
	updateSignUpStatus,
	updateSignInStatus,
	updateIsUserVerified,
	updateSignOutStatus,
	updateSaveUserDataStatus,
	updateAddCityFirebaseStatus,
	updateSavedCitiesStatus,
	upateUserIsAuth,
	updateSignUserError,
	updateDeleteUserStatus,
	updateEmptyState,
} = userSlice.actions;

const requestSavedCities = (userId) => async (dispatch) => {
	try {
		// dispatch(updateSavedCitiesStatus(LOADING));
		const results = await readUserData(userId);
		batch(() => {
			dispatch(updateSavedCitiesStatus(SUCCESS));
			dispatch(updateCitiesSaved(results));
			dispatch(requestInitialLocationWeather(results));
		});
	} catch (err) {
		console.error('fail update data user request');
		dispatch(updateSavedCitiesStatus(ERROR));
	}
};

export const requestSignUp = (email, password) => async (dispatch) => {
	try {
		dispatch(updateSignUpStatus(LOADING));
		const { user } = await createUser(email, password);
		batch(() => {
			dispatch(updateSignUpStatus(SUCCESS));
			dispatch(addUserInfo({ email: user.email, userId: user.uid }));
		});
		await emailVerification();
		await addPersistantAuth();
	} catch (err) {
		console.error('fail sign up request', err);
		dispatch(updateSignUserError(err.message));
		dispatch(updateSignUpStatus(ERROR));
	}
};

export const requestSignIn = (email, password) => async (dispatch) => {
	try {
		dispatch(updateSignInStatus(LOADING));
		const { user } = await signInUser(email, password);
		batch(() => {
			dispatch(updateSignInStatus(SUCCESS));
			dispatch(addUserInfo({ email: user.email, userId: user.uid }));
			dispatch(requestSavedCities(user.uid));
		});
		await addPersistantAuth();
	} catch (err) {
		console.error('fail sign in request', err);
		dispatch(updateSignUserError(err.message));
		dispatch(updateSignInStatus(ERROR));
	}
};

export const requestSignOut = () => async (dispatch) => {
	try {
		dispatch(updateSignOutStatus(LOADING));
		await signOutUser();
		batch(() => {
			dispatch(addUserInfo({ email: null, userId: null }));
			dispatch(updateSignOutStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail sign out request');
		dispatch(updateSignOutStatus(ERROR));
	}
};

export const requestDeleteUser = (email, password) => async (dispatch) => {
	try {
		dispatch(updateDeleteUserStatus(LOADING));
		await dispatch(requestSignIn(email, password));
		const succesDeleteUSer = await deleteUser();
		if (succesDeleteUSer) {
			batch(() => {
				dispatch(updateEmptyState());
				dispatch(updateModalState(false));
				dispatch(updateDeleteUserStatus(SUCCESS));
			});
		} else {
			console.error('fail delete user');
		}
	} catch (err) {
		console.error('fail delete user', err);
		dispatch(updateDeleteUserStatus(ERROR));
	}
};

export const requestAddCity = (userId, cities) => async (dispatch) => {
	try {
		// dispatch(updateAddCityFirebaseStatus(LOADING));
		cities.map(async (city) => {
			await addUserData(userId, city);
		});
		batch(() => {
			dispatch(updateAddCityFirebaseStatus(SUCCESS));
			dispatch(updateCitiesSaved(cities));
			dispatch(requestSavedCities(userId));
		});
	} catch (err) {
		console.error('fail update data user request');
		dispatch(updateAddCityFirebaseStatus(ERROR));
	}
};

export const getUserInitialPayload = () => async (dispatch) => {
	try {
		dispatch(updateWeatherStatus(LOADING));
		fetchCities().then((results) => dispatch(requestAndSaveCities(results)));
		const user = await checkPersistantUser();
		if (!user) return dispatch(upateUserIsAuth(false));
		if (user.emailVerified) dispatch(updateIsUserVerified(user.emailVerified));
		batch(() => {
			dispatch(requestSavedCities(user.uid));
			dispatch(updateWeatherStatus(SUCCESS));
			dispatch(addUserInfo({ email: user.email, userId: user.uid }));
		});
	} catch (err) {
		console.error(err);
	}
};

export const getUserState = (state) => state.user;
export const getUserId = (state) => getUserState(state).userId;
export const getIsUserAuth = (state) => getUserState(state).isAuth;
export const getIsUserVerified = (state) => getUserState(state).isUserVerified;
export const getUserEmail = (state) => getUserState(state).email;
export const getCitiesSaved = (state) => getUserState(state).citiesSaved;
export const getSignUserError = (state) => getUserState(state).signUserError;
export const getSignInStatus = (state) =>
	parseAPIStatus(getUserState(state).signInStatus);
export const getSignUpStatus = (state) =>
	parseAPIStatus(getUserState(state).signUpStatus);
export const getDeleteUserStatus = (state) =>
	parseAPIStatus(getUserState(state).deleteUserStatus);

export default userSlice.reducer;
