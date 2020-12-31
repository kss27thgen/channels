import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCFOf2vnvAUGweG6xde70fUHGEeNfz-Ukg",
    authDomain: "channels-a900e.firebaseapp.com",
    projectId: "channels-a900e",
    storageBucket: "channels-a900e.appspot.com",
    messagingSenderId: "119468329588",
    appId: "1:119468329588:web:0c825a83c866d8b6101f21"
};

firebase.initializeApp(firebaseConfig)

export default firebase;