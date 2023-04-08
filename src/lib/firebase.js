import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCjfVASj0b2lE1KxH-DzWc0IDVU229WS7E',
  authDomain: 'quick-view-5d730.firebaseapp.com',
  projectId: 'quick-view-5d730',
  storageBucket: 'quick-view-5d730.appspot.com',
  messagingSenderId: '324096611770',
  appId: '1:324096611770:web:9fc999dc7e568a3a513983',
  measurementId: 'G-K80DRWFMQW'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
