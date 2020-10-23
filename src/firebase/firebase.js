import * as firebase from 'firebase/app';
import { FIREBASE_CONFIG } from './firebaseConfig';
import 'firebase/auth';

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
