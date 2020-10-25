import firebase from '../firebase/firebase';

export const addUserData = (userId, savedCities) => {
	return firebase
		.database()
		.ref('user/' + userId)
		.child('saved_cities')
		.push(savedCities);
};
export const readUserData = (userId) => {
	return new Promise((resolve, reject) => {
		try {
			firebase
				.database()
				.ref(`user/${userId}/saved_cities`)
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
