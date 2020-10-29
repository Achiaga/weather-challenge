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
export const deleteCityUser = (userId, city) => {
	return new Promise((resolve, reject) => {
		try {
			firebase
				.database()
				.ref(fetchRoute(userId))
				.on('value', (snapshot) => {
					snapshot.forEach(function (childSnapshot) {
						let childData = childSnapshot.val();
						if (city === childData.name) childSnapshot.ref.remove();
					});
					resolve(city);
				});
		} catch {
			reject('api failed');
		}
	});
};
