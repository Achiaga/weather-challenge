import firebase from '../firebase/firebase';
import { createSlice } from '@reduxjs/toolkit';
import { LOADING, SUCCESS, ERROR } from '../constants';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: '',
		signUpStatus: '',
		signInStatus: '',
		signOutStatus: '',
	},
	reducers: {
		addUser: (state, action) => {
			state.user = action.payload;
		},
		// loginUser: (state, action) => {
		// 	FireBaseTools.fetchUser();
		// },
		updateSignUpStatus: (state, action) => {
			state.signUpStatus = action.payload;
		},
		updateSignInStatus: (state, action) => {
			state.signInStatus = action.payload;
		},
		updateSignOutStatus: (state, action) => {
			state.signOutStatus = action.payload;
		},
	},
});

export const {
	addUser,
	updateSignUpStatus,
	updateSignInStatus,
	updateSignOutStatus,
} = authSlice.actions;

export const requestSignUp = (email, password) => async (dispatch) => {
	try {
		dispatch(updateSignUpStatus(LOADING));
		const results = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);
		console.log(results);
		dispatch(addUser(results.user.email));
		dispatch(updateSignUpStatus(SUCCESS));
		firebase.auth().currentUser.sendEmailVerification();
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
	} catch (err) {
		console.error('fail signup request');
		dispatch(updateSignUpStatus(ERROR));
	}
};

export const requestSignIn = (email, password) => async (dispatch) => {
	try {
		dispatch(updateSignInStatus(LOADING));
		const results = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password);
		console.log(results);
		dispatch(addUser(results.user.email));
		dispatch(updateSignInStatus(SUCCESS));
	} catch (err) {
		console.error('fail signup request');
		dispatch(updateSignInStatus(ERROR));
	}
};

export const requestSignOut = () => async (dispatch) => {
	try {
		dispatch(updateSignOutStatus(LOADING));
		const results = await firebase.auth().signOut();
		dispatch(addUser(''));
		dispatch(updateSignOutStatus(SUCCESS));
	} catch (err) {
		console.error('fail signup request');
		dispatch(updateSignOutStatus(ERROR));
	}
};

// export const signout = () => async dispatch => {
//   try {
//       firebase
//           .auth()
//           .signOut()
//           .then(() => {
//               dispatch({ type: SIGNOUT_SUCCESS })
//           })
//           .catch(() => {
//               dispatch({
//                   type: SIGNOUT_ERROR,
//                   payload: "...some error message for the user..."
//               })
//           })
//       } catch (err) {
//           dispatch({
//               type: SIGNOUT_ERROR,
//               payload: "There was an issue signing out."
//           })
//   }
// }

export default authSlice.reducer;
