import firebase from '../firebase/firebase';

const fetchRoute = (userId) => `user/${userId}/saved_cities`;

export const addUserData = (userId, savedCities) => {
	return firebase.database().ref(fetchRoute(userId)).push(savedCities);
};
export const readUserData = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			firebase
				.database()
				.ref(fetchRoute(userId))
				.on('value', (snapshot) => {
					let savedCities = [];
					snapshot.forEach(function (childSnapshot) {
						let childData = childSnapshot.val();
						savedCities.push(childData);
					});
					resolve(savedCities);
				});
		} catch {
			reject('api failed');
		}
	});
};
