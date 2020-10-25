import firebase from '../firebase/firebase';

export const createUser = (email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const signInUser = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
};
export const signOutUser = () => {
	return firebase.auth().signOut();
};
export const persistantAuth = () => {
	return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};
export const emailVerification = () => {
	return firebase.auth().currentUser.sendEmailVerification();
};
export const checkPersistantUser = () => {
	return new Promise((resolve, reject) => {
		try {
			firebase.auth().onAuthStateChanged((user) => {
				resolve(user);
			});
		} catch {
			reject('api failed');
		}
	});
};
