import firebase from "firebase";
require("@firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBhdC2jCKqqLAYBF4RHDbwqH_qh3zuygkc",
  authDomain: "booksanta-53121.firebaseapp.com",
  projectId: "booksanta-53121",
  storageBucket: "booksanta-53121.appspot.com",
  messagingSenderId: "202849378052",
  appId: "1:202849378052:web:d5f90e16c0f2d4c2b77a51",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
