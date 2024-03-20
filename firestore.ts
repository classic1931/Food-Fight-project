import firebase from 'firebase/app';
import "firebase/firestore";
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyCmBu54-BcCCyBLY7lwYnSw_GBwkLhcrvE",
  authDomain: "food-fight-6b479.firebaseapp.com",
  projectId: "food-fight-6b479",
  storageBucket: "food-fight-6b479.appspot.com",
  messagingSenderId: "1083663535705",
  appId: "1:1083663535705:web:f670413a36159181feab48",
  measurementId: "G-XDYSRW1PS5"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};