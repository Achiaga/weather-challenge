import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase/firebase';
import { LOADING, SUCCESS, ERROR } from '../constants';
import {
	createUser,
	signInUser,
	signOutUser,
	addPersistantAuth,
	emailVerification,
	checkPersistantUser,
} from '../utils/auth';
import { addUserData, readUserData } from '../utils/database';
import { batch } from 'react-redux';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userId: '',
		email: '',
		city: '',
		citiesSaved: [],
		signUpStatus: '',
		signInStatus: '',
		signOutStatus: '',
		saveUserDataStatus: '',
		addUserDataStatus: '',
		savedCitiesStatus: '',
	},
	reducers: {
		addUserInfo: (state, action) => {
			state.userId = action.payload.userId;
			state.email = action.payload.email;
		},
		updateCitiesSaved: (state, action) => {
			action.payload.map(
				(city) => (state.citiesSaved = [...state.citiesSaved, city])
			);
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
	},
});

export const {
	addUserInfo,
	updateCitiesSaved,
	updateSignUpStatus,
	updateSignInStatus,
	updateSignOutStatus,
	updateSaveUserDataStatus,
	updateAddCityFirebaseStatus,
	updateSavedCitiesStatus,
} = userSlice.actions;

const requestSavedCities = (userId) => async (dispatch) => {
	try {
		dispatch(updateSavedCitiesStatus(LOADING));
		const results = await readUserData(userId);
		batch(() => {
			dispatch(updateSavedCitiesStatus(SUCCESS));
			dispatch(updateCitiesSaved(results));
		});
	} catch (err) {
		console.error('fail update data user request');
		dispatch(updateSavedCitiesStatus(ERROR));
	}
};

export const requestGetUser = () => async (dispatch) => {
	try {
		let user = await checkPersistantUser();
		if (user) {
			batch(() => {
				dispatch(addUserInfo({ email: user.email, userId: user.uid }));
				dispatch(requestSavedCities(user.uid));
			});
		} else {
		}
	} catch (err) {
		console.error('It is not a persistant user', err);
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
		// await emailVerification();
		await addPersistantAuth();
	} catch (err) {
		console.error('fail sign up request');
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
		console.error('fail sign in request');
		dispatch(updateSignInStatus(ERROR));
	}
};

export const requestSignOut = () => async (dispatch) => {
	try {
		dispatch(updateSignOutStatus(LOADING));
		await signOutUser();
		batch(() => {
			dispatch(addUserInfo({ email: '', userId: '' }));
			dispatch(updateSignOutStatus(SUCCESS));
		});
	} catch (err) {
		console.error('fail sign out request');
		dispatch(updateSignOutStatus(ERROR));
	}
};

export const requestAddCity = (userId, cities) => async (dispatch) => {
	try {
		dispatch(updateAddCityFirebaseStatus(LOADING));
		cities.map(async (city) => {
			await addUserData(userId, city);
		});
		batch(() => {
			dispatch(updateAddCityFirebaseStatus(SUCCESS));
			dispatch(updateCitiesSaved(cities));
		});
	} catch (err) {
		console.error('fail update data user request');
		dispatch(updateAddCityFirebaseStatus(ERROR));
	}
};

export const getUserState = (state) => state.user;
export const getUserId = (state) => getUserState(state).userId;
export const getCitiesSaved = (state) => getUserState(state).citiesSaved;

export default userSlice.reducer;
