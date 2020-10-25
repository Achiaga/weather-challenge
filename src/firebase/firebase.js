import * as firebase from 'firebase/app';
import { FIREBASE_CONFIG } from './firebaseConfig';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
